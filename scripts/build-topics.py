"""
Builds the topic pages' content (lib/topics/<section>.ts and lib/topics/search.ts) from the section
briefs the client supplied, which sit next to this project: "about us.rtf",
"manufacturing & supply chain.rtf", "global commerce.rtf", "innovation and technology.rtf" and
"sustainability & esg .rtf". Run it again after a brief changes:

    python3 scripts/build-topics.py

SECTIONS below lists, per main section, each topic page: its URL segment, menu label, the brief
sections it shows (by their capitalised heading), its photo and any lead override. The wording on
the pages is the briefs'; only headline capitalisation is adjusted. Needs macOS (textutil).
"""
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRIEFS = os.path.dirname(ROOT)
OUT = os.path.join(ROOT, "lib/topics")
BRIEF_FILES = {
    "about": "about us.rtf",
    "manufacturing": "manufacturing & supply chain.rtf",
    "commerce": "global commerce.rtf",
    "innovation": "innovation and technology.rtf",
    "sustainability": "sustainability & esg .rtf"
}

SMALL = {"and","of","the","to","for","with","in","on","across","from","a","an","at","by","or","into","as","beyond","through"}
ACRONYMS = {"ESG","AI","R&D","B2B","OEM","EV","RFQ","CEO","IP","USA","UK"}
PROPER = {"Cosmox","Industries","India","Europe","Africa","Asia-Pacific","North","America","Latin","Middle","East","Global","Innovation","Research","Center"}

def title_case(s):
    words = s.split()
    out = []
    for i, w in enumerate(words):
        if w.upper() in ACRONYMS or w in ACRONYMS:
            out.append(w.upper()); continue
        lw = w.lower()
        if i > 0 and lw in SMALL:
            out.append(lw); continue
        out.append("-".join(p[:1].upper() + p[1:] for p in lw.split("-")))
    return " ".join(out).replace("Let'S", "Let's")

def is_caps(line):
    letters = re.sub(r"[^A-Za-z]", "", line)
    return len(letters) >= 2 and letters.isupper() and len(line.split()) <= 7

def is_sentence(line):
    return line.endswith(".") or line.endswith(":") or len(line.split()) > 9

def is_short(line):
    return not is_sentence(line) and "→" not in line

def parse(path):
    # macOS textutil turns the .rtf brief into plain text; line separators become line breaks.
    raw = subprocess.run(["textutil", "-convert", "txt", "-stdout", path], check=True, capture_output=True, text=True).stdout
    raw = raw.replace("\u2028", "\n")
    sections = [s.strip() for s in re.split(r"\n\s*\n", raw) if s.strip()]
    out = {}
    for sec in sections:
        lines = [l.strip() for l in sec.split("\n") if l.strip()]
        heading = lines[0]
        title = lines[1] if len(lines) > 1 else ""
        body = [l for l in lines[2:] if not l.endswith("→")]
        body = [re.sub(r"^\d\d — ", "", l) for l in body]
        out[heading] = {"heading": heading, "title": title, "content": chunk(body)}
    return out

def chunk(body):
    chunks = []
    # Vertical flows: lines separated by ↓ (each step a title, optionally with a description).
    if "↓" in body:
        start = body.index("↓")
        # step before the first arrow may be TITLE+desc (2 lines) or a single line
        pre_end = start
        # find where the flow starts: walk back over one step
        def step_len(i):  # length of step ending before index i
            if i >= 2 and is_caps(body[i-2]) and is_sentence(body[i-1]): return 2
            return 1
        s0 = start - step_len(start)
        before, flow_part = body[:s0], body[s0:]
        # flow ends at the last step after the last arrow
        last = max(i for i, l in enumerate(flow_part) if l == "↓")
        tail_len = 2 if last + 2 < len(flow_part) and is_caps(flow_part[last+1]) and is_sentence(flow_part[last+2]) else 1
        flow_lines, after = flow_part[: last + 1 + tail_len], flow_part[last + 1 + tail_len :]
        steps = [s for s in split_on(flow_lines, "↓")]
        chunks += chunk(before)
        if all(len(s) == 2 for s in steps):
            chunks.append({"kind": "items", "items": [{"title": title_case(s[0]), "text": s[1]} for s in steps], "flow": True})
        else:
            chunks.append({"kind": "flow", "steps": [s[0] if not is_caps(s[0]) else title_case(s[0]) for s in steps]})
        chunks += chunk(after)
        return chunks
    if "with" in body:
        i = body.index("with")
        s0, e = i - 1, i
        while e + 2 < len(body) and body[e + 2] == "with": e += 2
        e += 2
        chunks += chunk(body[:s0])
        chunks.append({"kind": "flow", "steps": [l for l in body[s0:e] if l != "with"], "joiner": "with"})
        chunks += chunk(body[e:])
        return chunks
    i = 0
    while i < len(body):
        l = body[i]
        nxt = body[i + 1] if i + 1 < len(body) else None
        if "→" in l:
            chunks.append({"kind": "flow", "steps": [s.strip() for s in l.split("→")]}); i += 1; continue
        if " + " in l and len(l.split("+")) >= 3:
            chunks.append({"kind": "flow", "steps": [s.strip() for s in l.split("+")], "joiner": "+"}); i += 1; continue
        # CAPS title + description
        if is_caps(l) and nxt and not is_caps(nxt) and is_sentence(nxt):
            add_item(chunks, title_case(l), nxt); i += 2; continue
        # Title-case pairs: short, sentence, short, sentence...
        if is_short(l) and nxt and is_sentence(nxt) and not nxt.endswith(":"):
            prev_item = chunks and chunks[-1]["kind"] == "items" and not chunks[-1].get("caps")
            n2 = body[i + 2] if i + 2 < len(body) else None
            n3 = body[i + 3] if i + 3 < len(body) else None
            if prev_item or (n2 and n3 and is_short(n2) and is_sentence(n3) and not n3.endswith(":")):
                add_item(chunks, l, nxt, caps=False); i += 2; continue
        if is_caps(l) and not nxt:
            chunks.append({"kind": "p", "text": title_case(l)}); i += 1; continue
        if is_short(l):
            if chunks and chunks[-1]["kind"] == "list" and not chunks[-1].get("closed"):
                chunks[-1]["items"].append(l)
            else:
                label = None
                if chunks and chunks[-1]["kind"] == "p" and chunks[-1]["text"].endswith(":"):
                    label = chunks.pop()["text"]
                chunks.append({"kind": "list", "label": label, "items": [l]})
            i += 1; continue
        if chunks and chunks[-1]["kind"] == "list": chunks[-1]["closed"] = True
        chunks.append({"kind": "p", "text": l}); i += 1
    # item followed by (label +) list → group
    merged = []
    for c in chunks:
        if c["kind"] == "list" and merged and merged[-1]["kind"] == "items":
            last = merged[-1]["items"][-1]
            if "list" not in last:
                last["list"] = c["items"]; merged[-1]["groups"] = True
                if c.get("label"): last["label"] = c["label"]
                continue
        if c["kind"] == "list" and c.get("label") and merged and merged[-1]["kind"] == "items" and merged[-1]["items"][-1]["text"].endswith(":"):
            pass
        merged.append(c)
    for c in merged: c.pop("closed", None)
    return merged

def add_item(chunks, title, text, caps=True):
    if chunks and chunks[-1]["kind"] == "items" and not chunks[-1].get("flow"):
        chunks[-1]["items"].append({"title": title, "text": text})
    else:
        chunks.append({"kind": "items", "items": [{"title": title, "text": text}], "caps": caps})

def split_on(lines, sep):
    cur, out = [], []
    for l in lines:
        if l == sep:
            out.append(cur); cur = []
        else:
            cur.append(l)
    out.append(cur)
    return out


PROPER = ["Cosmox Industries", "Cosmox", "India", "Global Innovation & Research Center", "North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America"]
KEEP = {"ESG", "AI", "R&D", "B2B", "OEM", "EV"}

def sentence_case(t):
    out, start = [], True
    for w in t.split():
        core = re.sub(r"[^A-Za-z&'-]", "", w)
        if core in KEEP:
            out.append(w)
        elif start:
            out.append(w[:1] + w[1:].lower())
        else:
            out.append(w.lower())
        start = w.endswith(".") or w.endswith("?")
    s = " ".join(out)
    for name in PROPER:
        s = re.sub(re.escape(name), name, s, flags=re.I)
    return s

# Photo keys: "photos.x" → (code, file); "cat:division/category" → categoryPhoto(...)
def photo(key):
    if key.startswith("cat:"):
        d, c = key[4:].split("/")
        return f'categoryPhoto("{d}", "{c}")', f"categories/{d}/{c}.jpg"
    files = {"heroContact": "hero-contact.jpg", "heroNews": "hero-news.jpg", "heroDivisions": "hero-divisions.jpg", "heroSuppliers": "hero-suppliers.jpg", "heroPartnerships": "hero-partnerships.jpg"}
    return f"photos.{key}", files.get(key, re.sub(r"([A-Z])", r"-\1", key).lower() + ".jpg")

SECTIONS = {
 "company": ("about", [
  ("who-we-are", "Who We Are", ["WHO WE ARE", "OUR STAKEHOLDERS", "WHY COSMOX INDUSTRIES"], "heroContact", {}),
  ("our-purpose", "Our Purpose", ["OUR PURPOSE", "OUR APPROACH TO GROWTH"], "construction", {}),
  ("our-vision", "Our Vision", ["OUR VISION", "OUR LONG-TERM AMBITION", "BUILDING WHAT COMES NEXT"], "heroNews", {}),
  ("our-mission", "Our Mission", ["OUR MISSION", "STRATEGIC PRIORITIES"], "heroDivisions", {}),
  ("our-business-model", "Our Business Model", ["OUR BUSINESS MODEL", "OUR INDUSTRIAL CAPABILITIES", "QUALITY & EXCELLENCE"], "cat:machinery/pumps-compressors-vacuum-fluid-equipment", {}),
  ("our-people", "Our People", ["OUR PEOPLE"], "people", {}),
  ("values-and-culture", "Values & Culture", ["OUR VALUES", "OUR CULTURE"], "heroPartnerships", {"lead_from": 1}),
  ("leadership-and-governance", "Leadership & Governance", ["LEADERSHIP", "CORPORATE GOVERNANCE", "RESPONSIBLE BUSINESS"], "cat:aerospace-defence/electrical-thermal-cabin-space-products", {}),
 ]),
 "manufacturing": ("manufacturing", [
  ("our-manufacturing-philosophy", "Our Manufacturing Philosophy", ["OUR MANUFACTURING PHILOSOPHY", "OUR OPERATING PROMISE", "INTEGRATED OPERATIONS", "CONTINUOUS IMPROVEMENT"], "machinery",
   {"lead": "A strong industrial business requires more than a product. It requires dependable raw materials, qualified suppliers, controlled processes, skilled people, reliable production, rigorous quality systems and an efficient path from factory to customer."}),
  ("from-raw-material-to-customer", "From Raw Material to Customer", ["FROM RAW MATERIAL TO CUSTOMER", "TRACEABILITY", "GLOBAL SUPPLY CHAIN"], "cat:metal-mining/specialty-alloys-ferroalloys", {}),
  ("manufacturing-capabilities", "Manufacturing Capabilities", ["MANUFACTURING CAPABILITIES", "PROCESS DEVELOPMENT", "SCALE-UP", "MANUFACTURING ACROSS OUR 12 BUSINESS DIVISIONS"], "cat:machinery/process-machinery-equipment", {}),
  ("custom-manufacturing", "Custom Manufacturing", ["CUSTOM MANUFACTURING", "CONTRACT MANUFACTURING", "CUSTOMER-SPECIFIC SUPPLY SOLUTIONS", "FOR CUSTOMERS"], "cat:machinery/machine-tools-metalworking", {}),
  ("quality-management", "Quality Management", ["QUALITY MANAGEMENT", "QUALITY CONTROL"], "quality", {}),
  ("supply-chain", "Supply Chain", ["SUPPLIER MANAGEMENT", "SUPPLIER QUALIFICATION", "STRATEGIC SOURCING", "PROCUREMENT", "SUPPLY CHAIN PLANNING", "INVENTORY MANAGEMENT", "WAREHOUSING", "LOGISTICS", "SUPPLY CHAIN RESILIENCE"], "cat:machinery/material-handling-automation-robotics", {}),
  ("responsible-operations", "Responsible Operations", ["MANUFACTURING SAFETY", "SUSTAINABLE MANUFACTURING", "DIGITAL MANUFACTURING", "AUTOMATION"], "cat:machinery/industrial-automation-electrical-control", {}),
 ]),
 "commerce": ("commerce", [
  ("a-global-industrial-network", "A Global Industrial Network", ["A GLOBAL INDUSTRIAL NETWORK", "B2B COMMERCIAL PLATFORM", "GLOBAL CUSTOMER NETWORK", "WHY PARTNER WITH COSMOX GLOBAL COMMERCE"], "heroSuppliers", {}),
  ("global-trade", "Global Trade", ["GLOBAL TRADE", "INTERNATIONAL MARKET DEVELOPMENT", "GLOBAL BUSINESS DEVELOPMENT", "TRADE & INDUSTRY INTELLIGENCE"], "cat:food-beverage/flavours-colours-spices-seasonings", {}),
  ("global-distribution", "Global Distribution", ["GLOBAL DISTRIBUTION", "GLOBAL LOGISTICS", "FOR DISTRIBUTORS"], "cat:packaging/industrial-bulk-transport-packaging", {}),
  ("global-sourcing", "Global Sourcing", ["GLOBAL SOURCING", "STRATEGIC PROCUREMENT", "INDUSTRIAL SOURCING", "CUSTOM & SPECIALIZED SOURCING", "GLOBAL SUPPLIER NETWORK", "MANUFACTURER NETWORK"], "cat:metal-mining/critical-strategic-metals", {}),
  ("cross-border-supply", "Cross-Border Supply", ["CROSS-BORDER SUPPLY", "PRODUCT DOCUMENTATION", "RESILIENT GLOBAL SUPPLY CHAINS"], "cat:packaging/sustainable-barrier-specialty-packaging-materials", {}),
  ("regional-markets", "Regional Markets", ["REGIONAL MARKETS", "GLOBAL COMMERCE ACROSS 12 DIVISIONS"], "global", {}),
  ("responsible-trade", "Responsible Trade", ["TRADE COMPLIANCE", "RESPONSIBLE SOURCING", "OUR GLOBAL COMMERCE PROMISE"], "cat:semiconductor-electronics/process-specialty-gases", {}),
 ]),
 "innovation": ("innovation", [
  ("research-and-development", "Research & Development", ["RESEARCH & DEVELOPMENT", "PROTOTYPING & DEVELOPMENT", "TESTING & VALIDATION", "FROM RESEARCH TO MARKET"], "cat:pharmaceuticals/pharmaceutical-intermediates-ksms", {}),
  ("global-innovation-and-research-center", "Innovation & Research Center", ["GLOBAL INNOVATION & RESEARCH CENTER", "INNOVATION AT COSMOX INDUSTRIES", "OUR INNOVATION PHILOSOPHY", "TECHNOLOGY TRANSFER", "INTELLECTUAL PROPERTY"], "cat:semiconductor-electronics/ultra-high-purity-chemicals", {}),
  ("technology-areas", "Technology Areas", ["INNOVATION ACROSS OUR 12 BUSINESS DIVISIONS", "ENERGY & ELECTROCHEMICAL TECHNOLOGIES", "ELECTRONICS & SEMICONDUCTOR TECHNOLOGY", "BIOTECHNOLOGY & LIFE SCIENCES", "SUSTAINABLE TECHNOLOGY"], "semiconductor", {}),
  ("advanced-materials", "Advanced Materials", ["ADVANCED MATERIALS", "PROCESS TECHNOLOGY"], "cat:aerospace-defence/aerospace-composites-advanced-materials", {}),
  ("automation-and-robotics", "Automation & Robotics", ["AUTOMATION & ROBOTICS", "INDUSTRIAL ENGINEERING"], "automotive", {}),
  ("artificial-intelligence", "Artificial Intelligence", ["ARTIFICIAL INTELLIGENCE", "THE FUTURE OF INNOVATION"], "digital", {}),
  ("digital-industry", "Digital Industry", ["DIGITAL INDUSTRY"], "cat:semiconductor-electronics/photoresists-cmp-process-materials", {}),
  ("customer-driven-innovation", "Customer-Driven Innovation", ["CUSTOMER-DRIVEN INNOVATION"], "cat:food-beverage/functional-food-additives", {}),
  ("open-innovation", "Open Innovation", ["OPEN INNOVATION", "OUR TECHNOLOGY ECOSYSTEM", "UNIVERSITY & RESEARCH COLLABORATION", "STARTUP COLLABORATION"], "cat:semiconductor-electronics/packaging-assembly-materials", {}),
 ]),
 "sustainability": ("sustainability", [
  ("our-sustainability-vision", "Our Sustainability Vision", ["OUR SUSTAINABILITY VISION", "OUR LONG-TERM COMMITMENT", "MEASUREMENT & TRANSPARENCY", "CONTINUOUS IMPROVEMENT"], "cat:energy/renewable-energy", {}),
  ("our-esg-framework", "Our ESG Framework", ["OUR ESG FRAMEWORK", "ESG ACROSS OUR 12 BUSINESS DIVISIONS"], "cat:food-beverage/agricultural-commodity-food-ingredients",
   {"lead": "Our Sustainability & ESG approach focuses on building businesses that are economically strong, environmentally responsible, socially conscious and governed with integrity."}),
  ("environment", "Environment", ["ENVIRONMENT", "WATER STEWARDSHIP", "WASTE MANAGEMENT", "SUSTAINABLE MANUFACTURING", "SUSTAINABLE PRODUCTS"], "cat:fashion-textile/natural-regenerated-blended-fibers-yarns", {}),
  ("energy-and-climate", "Energy & Climate", ["ENERGY & CLIMATE", "EMISSIONS", "ESG & INNOVATION"], "cat:energy/battery-energy-storage", {}),
  ("circular-economy", "Circular Economy", ["CIRCULAR ECONOMY", "SUSTAINABLE MATERIALS"], "packaging",
   {"lead": "Increasing opportunities for reuse, recovery and recycling."}),
  ("social-responsibility", "Social Responsibility", ["SOCIAL RESPONSIBILITY", "HEALTH & SAFETY", "EMPLOYEE DEVELOPMENT", "DIVERSITY & INCLUSION", "HUMAN RIGHTS", "COMMUNITY DEVELOPMENT"], "cat:construction-materials/waterproofing-protective-coatings", {}),
  ("governance", "Governance & Ethics", ["GOVERNANCE", "ETHICAL BUSINESS", "ANTI-CORRUPTION", "RISK MANAGEMENT", "DATA & DIGITAL RESPONSIBILITY", "PRODUCT RESPONSIBILITY", "RESPONSIBLE BUSINESS PARTNERSHIPS", "RESPONSIBLE SOURCING", "ESG & SUPPLY CHAIN", "ESG & GLOBAL COMMERCE"], "cat:aerospace-defence/fasteners-seals-bearings-components", {}),
  ("our-esg-priorities", "Our ESG Priorities", ["OUR ESG PRIORITIES", "ESG & CUSTOMERS"], "energy",
   {"lead": "Cosmox Industries believes the future of industry will be defined not only by what companies produce, but by how they produce it, how responsibly they operate and how much long-term value they create."}),
 ]),
}

def finish(content):
    out = []
    for c in content:
        c = {k: v for k, v in c.items() if v is not None and k not in ("caps", "flow")}
        out.append(c)
    # sections mixing groups and items: everything from the first to the last items chunk becomes one groups chunk
    idx = [i for i, c in enumerate(out) if c["kind"] == "items"]
    if any(out[i].get("groups") for i in idx):
        a, b = idx[0], idx[-1]
        items = []
        for c in out[a:b + 1]:
            if c["kind"] == "items":
                items += c["items"]
            elif c["kind"] == "p":
                items[-1]["text"] = (items[-1].get("text", "") + " " + c["text"]).strip()
            elif c["kind"] == "list":
                items[-1]["list"] = c["items"]
                if c.get("label"): items[-1]["label"] = c["label"]
        out = out[:a] + [{"kind": "groups", "items": items}] + out[b + 1:]
    for c in out: c.pop("groups", None)
    return out

for name, (brief, topics) in SECTIONS.items():
    data = parse(os.path.join(BRIEFS, BRIEF_FILES[brief]))
    ts_topics = []
    for slug, label, heads, pkey, opt in topics:
        blocks = []
        for h in heads:
            sec = data[h]
            blocks.append({"label": title_case(h), "title": sentence_case(sec["title"]), "content": finish(sec["content"])})
        hero_title = data[heads[0]]["title"]
        lead = opt.get("lead")
        if not lead:
            src = blocks[opt.get("lead_from", 0)]["content"]
            assert src and src[0]["kind"] == "p" and not src[0]["text"].endswith(":"), (slug, src[:1])
            lead = src.pop(0)["text"]
        code, file = photo(pkey)
        assert os.path.exists(os.path.join(ROOT, "assets/photos", file)), file
        ts_topics.append((slug, label, hero_title, lead, code, file, blocks))
    lines = ['// Generated from the section briefs (about us.rtf, manufacturing & supply chain.rtf, global commerce.rtf,',
             '// innovation and technology.rtf, sustainability & esg .rtf) by scripts/build-topics.py. Edit the briefs or the script, not this file.',
             'import { categoryPhoto } from "@/lib/catalogue";', 'import { photos } from "@/lib/photos";', 'import type { Topic } from "@/lib/topics/types";', '',
             f"export const {name}Topics: Topic[] = ["]
    for slug, label, title, lead, code, file, blocks in ts_topics:
        lines.append("  {")
        lines.append(f"    slug: {json.dumps(slug)},")
        lines.append(f"    label: {json.dumps(label)},")
        lines.append(f"    title: {json.dumps(title, ensure_ascii=False)},")
        lines.append(f"    lead: {json.dumps(lead, ensure_ascii=False)},")
        lines.append(f"    photo: {code},")
        lines.append(f"    ogPhoto: {json.dumps(file)},")
        lines.append(f"    blocks: {json.dumps(blocks, ensure_ascii=False, indent=2)},".replace("\n", "\n    "))
        lines.append("  },")
    lines.append("];")
    text = re.sub(r'"(\w+)": ', r"\1: ", "\n".join(lines) + "\n")
    open(f"{OUT}/{name}.ts", "w").write(text)
    print(name, len(ts_topics))

# A slim list for the header search, so its lazy bundle doesn't carry every page's text.
paths = {"company": ("/about", "Company"), "manufacturing": ("/manufacturing-supply-chain", "Manufacturing & Supply Chain"),
         "commerce": ("/global-commerce", "Global Commerce"), "innovation": ("/innovation-technology", "Innovation & Technology"),
         "sustainability": ("/sustainability-esg", "Sustainability")}
rows = []
for name, (brief, topics) in SECTIONS.items():
    data = parse(os.path.join(BRIEFS, BRIEF_FILES[brief]))
    base, section = paths[name]
    for slug, label, heads, pkey, opt in topics:
        rows.append({"href": f"{base}/{slug}", "section": section, "label": label, "title": data[heads[0]]["title"],
                     "keywords": " ".join(title_case(h) for h in heads)})
text = ("// Generated by scripts/build-topics.py with the topic pages: what the header search needs to find them.\n"
        "export const topicSearchEntries = " + json.dumps(rows, ensure_ascii=False, indent=2) + ";\n")
open(f"{OUT}/search.ts", "w").write(re.sub(r'"(\w+)": ', r"\1: ", text))
