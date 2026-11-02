// Generated from the section briefs (about us.rtf, manufacturing & supply chain.rtf, global commerce.rtf,
// innovation and technology.rtf, sustainability & esg .rtf) by scripts/build-topics.py. Edit the briefs or the script, not this file.
import { categoryPhoto } from "@/lib/catalogue";
import { photos } from "@/lib/photos";
import type { Topic } from "@/lib/topics/types";

export const manufacturingTopics: Topic[] = [
  {
    slug: "our-manufacturing-philosophy",
    label: "Our Manufacturing Philosophy",
    title: "Build With Precision. Scale With Discipline.",
    lead: "A strong industrial business requires more than a product. It requires dependable raw materials, qualified suppliers, controlled processes, skilled people, reliable production, rigorous quality systems and an efficient path from factory to customer.",
    photo: photos.machinery,
    ogPhoto: "machinery.jpg",
    blocks: [
      {
        label: "Our Manufacturing Philosophy",
        title: "Build with precision. Scale with discipline.",
        content: [
          {
            kind: "p",
            text: "We believe manufacturing excellence is created through the continuous integration of:"
          },
          {
            kind: "flow",
            steps: [
              "People",
              "Process",
              "Technology",
              "Quality",
              "Supply Chain"
            ],
            joiner: "+"
          },
          {
            kind: "list",
            label: "Our manufacturing approach focuses on building production capabilities that are:",
            items: [
              "Reliable",
              "Consistent",
              "Scalable",
              "Efficient",
              "Flexible",
              "Technology-enabled",
              "Quality-focused",
              "Customer-oriented"
            ]
          },
          {
            kind: "p",
            text: "We continuously seek opportunities to improve productivity, reduce inefficiencies, strengthen process control and increase manufacturing resilience."
          }
        ]
      },
      {
        label: "Our Operating Promise",
        title: "Quality. Reliability. Efficiency. Continuity.",
        content: [
          {
            kind: "p",
            text: "Cosmox Industries is building manufacturing and supply-chain capabilities around four fundamental objectives:"
          },
          {
            kind: "items",
            items: [
              {
                title: "Quality",
                text: "Products must meet defined requirements consistently."
              },
              {
                title: "Reliability",
                text: "Customers need dependable supply."
              },
              {
                title: "Efficiency",
                text: "Operations must continuously improve."
              },
              {
                title: "Continuity",
                text: "Supply chains must be prepared for changing market conditions."
              }
            ]
          },
          {
            kind: "p",
            text: "Together, these principles form the foundation of our operating model."
          }
        ]
      },
      {
        label: "Integrated Operations",
        title: "One connected system",
        content: [
          {
            kind: "p",
            text: "Manufacturing becomes more powerful when connected with the rest of the organization."
          },
          {
            kind: "p",
            text: "Our operating model links:"
          },
          {
            kind: "flow",
            steps: [
              "R&D",
              "Product Development",
              "Process Engineering",
              "Manufacturing",
              "Quality",
              "Procurement",
              "Supply Chain",
              "Global Commerce",
              "Customer"
            ]
          },
          {
            kind: "p",
            text: "This creates a continuous feedback loop between markets, products and operations."
          }
        ]
      },
      {
        label: "Continuous Improvement",
        title: "Better every cycle",
        content: [
          {
            kind: "p",
            text: "Manufacturing excellence is never finished."
          },
          {
            kind: "list",
            label: "We continuously evaluate:",
            items: [
              "Quality",
              "Productivity",
              "Yield",
              "Energy consumption",
              "Material utilization",
              "Equipment performance",
              "Production time",
              "Supply reliability",
              "Customer feedback"
            ]
          },
          {
            kind: "p",
            text: "The objective is to identify opportunities for measurable improvement and strengthen our long-term competitiveness."
          }
        ]
      }
    ],
  },
  {
    slug: "from-raw-material-to-customer",
    label: "From Raw Material to Customer",
    title: "An Integrated Industrial Value Chain",
    lead: "Our operating model connects every major stage of the supply chain.",
    photo: categoryPhoto("metal-mining", "specialty-alloys-ferroalloys"),
    ogPhoto: "categories/metal-mining/specialty-alloys-ferroalloys.jpg",
    blocks: [
      {
        label: "From Raw Material to Customer",
        title: "An integrated industrial value chain",
        content: [
          {
            kind: "items",
            items: [
              {
                title: "Raw Materials",
                text: "Identify reliable sources of raw materials, ingredients, components and industrial inputs."
              },
              {
                title: "Sourcing",
                text: "Evaluate qualified domestic and international suppliers."
              },
              {
                title: "Procurement",
                text: "Manage commercial purchasing and supply agreements."
              },
              {
                title: "Quality",
                text: "Verify materials and suppliers against applicable requirements."
              },
              {
                title: "Manufacturing",
                text: "Convert materials into finished products through controlled production processes."
              },
              {
                title: "Testing",
                text: "Evaluate products for quality, performance and consistency."
              },
              {
                title: "Packaging",
                text: "Prepare products according to product and customer requirements."
              },
              {
                title: "Warehousing",
                text: "Store products safely and efficiently."
              },
              {
                title: "Logistics",
                text: "Coordinate domestic and international transportation."
              },
              {
                title: "Customer",
                text: "Deliver products reliably to customers and markets."
              }
            ]
          }
        ]
      },
      {
        label: "Traceability",
        title: "Knowing where products come from and where they go",
        content: [
          {
            kind: "p",
            text: "Traceability supports quality, compliance and supply-chain visibility."
          },
          {
            kind: "p",
            text: "Depending on the product and industry, traceability can connect:"
          },
          {
            kind: "flow",
            steps: [
              "Supplier",
              "Raw Material",
              "Production",
              "Batch",
              "Testing",
              "Packaging",
              "Shipment",
              "Customer"
            ]
          },
          {
            kind: "p",
            text: "This provides greater visibility across the product lifecycle and supports effective quality management."
          }
        ]
      },
      {
        label: "Global Supply Chain",
        title: "Connecting multiple markets",
        content: [
          {
            kind: "p",
            text: "Cosmox Industries is building supply-chain capabilities that support international business."
          },
          {
            kind: "p",
            text: "Our global supply-chain model can connect:"
          },
          {
            kind: "flow",
            steps: [
              "Global Suppliers",
              "International Procurement",
              "Manufacturing",
              "Quality",
              "Warehousing",
              "International Logistics",
              "Regional Distribution",
              "Global Customers"
            ]
          },
          {
            kind: "p",
            text: "This approach enables businesses to source, manufacture and distribute across multiple markets."
          }
        ]
      }
    ],
  },
  {
    slug: "manufacturing-capabilities",
    label: "Manufacturing Capabilities",
    title: "Building Production Platforms for Specialized Industries",
    lead: "Our manufacturing capabilities are developed according to the technical and commercial requirements of each business division.",
    photo: categoryPhoto("machinery", "process-machinery-equipment"),
    ogPhoto: "categories/machinery/process-machinery-equipment.jpg",
    blocks: [
      {
        label: "Manufacturing Capabilities",
        title: "Building production platforms for specialized industries",
        content: [
          {
            kind: "list",
            label: "Depending on the product and industry, our capabilities can include:",
            items: [
              "Specialty manufacturing",
              "Process manufacturing",
              "Batch manufacturing",
              "Continuous manufacturing",
              "Custom manufacturing",
              "Contract manufacturing",
              "OEM manufacturing",
              "Pilot-scale production",
              "Commercial-scale production",
              "Process scale-up",
              "Process optimization",
              "Custom product development"
            ]
          },
          {
            kind: "p",
            text: "Our manufacturing strategy is designed to support both established products and new products moving from development toward commercialization."
          }
        ]
      },
      {
        label: "Process Development",
        title: "Turning technical concepts into repeatable processes",
        content: [
          {
            kind: "p",
            text: "A successful manufacturing process must deliver consistent results."
          },
          {
            kind: "list",
            label: "Our process-development activities focus on understanding the relationship between:",
            items: [
              "Raw materials",
              "Equipment",
              "Process parameters",
              "Operating conditions",
              "Product characteristics",
              "Quality requirements",
              "Production economics"
            ]
          },
          {
            kind: "p",
            text: "We work to develop processes that can be transferred from laboratory or pilot environments into commercial manufacturing while maintaining product performance and consistency."
          }
        ]
      },
      {
        label: "Scale-Up",
        title: "From development to commercial production",
        content: [
          {
            kind: "p",
            text: "Scaling a process requires careful engineering and operational planning."
          },
          {
            kind: "p",
            text: "Our scale-up approach can involve:"
          },
          {
            kind: "items",
            items: [
              {
                title: "Laboratory",
                text: "Initial research and technical development."
              },
              {
                title: "Pilot",
                text: "Testing the process under controlled, larger-scale conditions."
              },
              {
                title: "Engineering",
                text: "Evaluating equipment, process parameters and production requirements."
              },
              {
                title: "Commercial Scale",
                text: "Transferring the process into production."
              },
              {
                title: "Optimization",
                text: "Improving yield, efficiency, quality and economics."
              },
              {
                title: "Continuous Improvement",
                text: "Monitoring performance and identifying further opportunities."
              }
            ]
          }
        ]
      },
      {
        label: "Manufacturing across Our 12 Business Divisions",
        title: "Specialized production for specialized industries",
        content: [
          {
            kind: "items",
            items: [
              {
                title: "Pharmaceuticals",
                text: "Specialty products, pharmaceutical materials, intermediates and custom manufacturing."
              },
              {
                title: "Food & Beverage",
                text: "Ingredients, specialty materials and food-related manufacturing capabilities."
              },
              {
                title: "Energy",
                text: "Energy materials, electrochemical products and advanced energy-related manufacturing."
              },
              {
                title: "Semiconductor & Electronics",
                text: "Specialty electronic materials, high-purity products and advanced manufacturing inputs."
              },
              {
                title: "Automotive & Autoparts",
                text: "Components, materials, engineered products and EV-related manufacturing."
              },
              {
                title: "Machinery",
                text: "Industrial machinery, engineering components, automation and production systems."
              },
              {
                title: "Metal & Mining",
                text: "Metal products, minerals, processing and resource-related supply capabilities."
              },
              {
                title: "Fashion & Textile",
                text: "Textile materials, fibers, chemicals and technical textile products."
              },
              {
                title: "Packaging",
                text: "Packaging materials, barrier solutions and specialized packaging products."
              },
              {
                title: "Construction Materials",
                text: "Construction chemicals, materials, additives and infrastructure products."
              },
              {
                title: "Aerospace & Defence",
                text: "Advanced materials, specialized components and high-performance manufacturing."
              },
              {
                title: "Jewellery",
                text: "Precious materials, processing chemicals and specialized jewellery manufacturing inputs."
              }
            ]
          }
        ]
      }
    ],
  },
  {
    slug: "custom-manufacturing",
    label: "Custom Manufacturing",
    title: "Manufacturing Around Customer Requirements",
    lead: "Customers may require products that are not available as standard commercial products.",
    photo: categoryPhoto("machinery", "machine-tools-metalworking"),
    ogPhoto: "categories/machinery/machine-tools-metalworking.jpg",
    blocks: [
      {
        label: "Custom Manufacturing",
        title: "Manufacturing around customer requirements",
        content: [
          {
            kind: "list",
            label: "Our manufacturing platform can support specialized requirements such as:",
            items: [
              "Custom specifications",
              "Customized formulations",
              "Specific grades",
              "Special purity requirements",
              "Dedicated production",
              "Custom packaging",
              "Contract production",
              "OEM requirements",
              "Scale-up requirements"
            ]
          },
          {
            kind: "p",
            text: "Each project is evaluated according to technical feasibility, regulatory requirements, manufacturing capacity and commercial requirements."
          }
        ]
      },
      {
        label: "Contract Manufacturing",
        title: "Extending manufacturing capacity through partnership",
        content: [
          {
            kind: "p",
            text: "Companies may require additional manufacturing capacity without building their own production infrastructure."
          },
          {
            kind: "p",
            text: "Cosmox Industries can explore contract manufacturing relationships where our capabilities align with customer requirements."
          },
          {
            kind: "list",
            label: "Potential areas include:",
            items: [
              "Specialty products",
              "Industrial materials",
              "Components",
              "Ingredients",
              "Formulated products",
              "Specialized manufacturing processes"
            ]
          },
          {
            kind: "p",
            text: "Our approach emphasizes confidentiality, quality, consistency and reliable delivery."
          }
        ]
      },
      {
        label: "Customer-Specific Supply Solutions",
        title: "Built around your requirements",
        content: [
          {
            kind: "p",
            text: "Different customers have different supply requirements."
          },
          {
            kind: "list",
            label: "We can develop commercial and supply approaches around:",
            items: [
              "Recurring supply",
              "Long-term contracts",
              "Scheduled deliveries",
              "Regional supply",
              "Customized packaging",
              "Dedicated production",
              "Safety-stock requirements",
              "International delivery",
              "Multi-location supply"
            ]
          },
          {
            kind: "p",
            text: "Our objective is to create supply solutions that fit the customer's operational requirements."
          }
        ]
      },
      {
        label: "For Customers",
        title: "Looking for a manufacturing partner?",
        content: [
          {
            kind: "list",
            label: "Cosmox Industries can explore manufacturing relationships based on:",
            items: [
              "Product requirements",
              "Technical specifications",
              "Required volumes",
              "Manufacturing location",
              "Quality requirements",
              "Regulatory requirements",
              "Packaging",
              "Delivery requirements",
              "Commercial expectations"
            ]
          }
        ]
      }
    ],
  },
  {
    slug: "quality-management",
    label: "Quality Management",
    title: "Quality From the Beginning",
    lead: "Quality is integrated throughout our manufacturing processes.",
    photo: photos.quality,
    ogPhoto: "quality.jpg",
    blocks: [
      {
        label: "Quality Management",
        title: "Quality from the beginning",
        content: [
          {
            kind: "list",
            label: "Our quality approach can include:",
            items: [
              "Raw-material inspection",
              "Supplier qualification",
              "Process controls",
              "In-process testing",
              "Finished-product testing",
              "Batch documentation",
              "Product traceability",
              "Equipment controls",
              "Corrective and preventive actions",
              "Continuous improvement"
            ]
          },
          {
            kind: "p",
            text: "The exact quality system and certification requirements depend on the relevant industry, product and applicable regulations."
          }
        ]
      },
      {
        label: "Quality Control",
        title: "Measuring what matters",
        content: [
          {
            kind: "p",
            text: "Our quality-control activities are designed to verify that products meet defined specifications and customer requirements."
          },
          {
            kind: "list",
            label: "Testing may cover:",
            items: [
              "Physical properties",
              "Chemical properties",
              "Mechanical properties",
              "Thermal properties",
              "Electrical properties",
              "Purity",
              "Composition",
              "Functional performance",
              "Packaging integrity",
              "Stability"
            ]
          },
          {
            kind: "p",
            text: "Testing requirements are established according to the product and intended application."
          }
        ]
      }
    ],
  },
  {
    slug: "supply-chain",
    label: "Supply Chain",
    title: "Building a Reliable Supplier Ecosystem",
    lead: "Strong manufacturing starts with reliable inputs.",
    photo: categoryPhoto("machinery", "material-handling-automation-robotics"),
    ogPhoto: "categories/machinery/material-handling-automation-robotics.jpg",
    blocks: [
      {
        label: "Supplier Management",
        title: "Building a reliable supplier ecosystem",
        content: [
          {
            kind: "list",
            label: "We evaluate suppliers based on factors such as:",
            items: [
              "Product quality",
              "Manufacturing capability",
              "Capacity",
              "Technical expertise",
              "Reliability",
              "Pricing",
              "Delivery performance",
              "Compliance",
              "Documentation",
              "Responsible business practices"
            ]
          },
          {
            kind: "p",
            text: "We seek to build long-term relationships with suppliers capable of supporting consistent and scalable growth."
          }
        ]
      },
      {
        label: "Supplier Qualification",
        title: "Selecting suppliers with discipline",
        content: [
          {
            kind: "p",
            text: "Supplier qualification can include:"
          },
          {
            kind: "items",
            items: [
              {
                title: "Initial Assessment",
                text: "Understanding supplier capabilities, products and manufacturing infrastructure."
              },
              {
                title: "Technical Review",
                text: "Reviewing specifications, production processes and technical documentation."
              },
              {
                title: "Quality Review",
                text: "Evaluating quality systems and product consistency."
              },
              {
                title: "Commercial Review",
                text: "Assessing pricing, capacity, payment terms and commercial conditions."
              },
              {
                title: "Compliance Review",
                text: "Evaluating relevant regulatory and legal requirements."
              },
              {
                title: "Performance Monitoring",
                text: "Reviewing quality, delivery and service over time."
              }
            ]
          }
        ]
      },
      {
        label: "Strategic Sourcing",
        title: "Building resilient supply networks",
        content: [
          {
            kind: "p",
            text: "Our sourcing approach focuses on creating reliable and commercially competitive supply networks."
          },
          {
            kind: "list",
            label: "We consider:",
            items: [
              "Multiple sourcing options",
              "Geographic diversification",
              "Supplier capacity",
              "Lead times",
              "Inventory requirements",
              "Cost",
              "Quality",
              "Supply continuity",
              "Market conditions"
            ]
          },
          {
            kind: "p",
            text: "Where practical, diversified sourcing can help reduce unnecessary supply-chain risk."
          }
        ]
      },
      {
        label: "Procurement",
        title: "Creating value beyond purchase price",
        content: [
          {
            kind: "p",
            text: "Procurement influences cost, quality, supply continuity and operational performance."
          },
          {
            kind: "list",
            label: "Our procurement activities include:",
            items: [
              "Supplier identification",
              "RFQ management",
              "Commercial negotiations",
              "Purchase planning",
              "Supplier selection",
              "Contract management",
              "Procurement analytics",
              "Supplier performance monitoring",
              "Cost optimization"
            ]
          },
          {
            kind: "p",
            text: "Our objective is to create sustainable procurement value rather than simply minimizing purchase price."
          }
        ]
      },
      {
        label: "Supply Chain Planning",
        title: "Matching supply with demand",
        content: [
          {
            kind: "p",
            text: "Efficient supply chains require coordination between customer demand, production capacity and material availability."
          },
          {
            kind: "list",
            label: "Our planning activities can include:",
            items: [
              "Demand planning",
              "Supply planning",
              "Production planning",
              "Inventory planning",
              "Material planning",
              "Capacity planning",
              "Logistics planning"
            ]
          },
          {
            kind: "p",
            text: "We seek to maintain an appropriate balance between product availability, inventory efficiency and supply continuity."
          }
        ]
      },
      {
        label: "Inventory Management",
        title: "The right product at the right time",
        content: [
          {
            kind: "p",
            text: "Inventory plays an important role in supply-chain reliability."
          },
          {
            kind: "list",
            label: "Our inventory approach considers:",
            items: [
              "Demand patterns",
              "Product lead times",
              "Supplier reliability",
              "Production schedules",
              "Customer requirements",
              "Storage conditions",
              "Working capital",
              "Supply risk"
            ]
          },
          {
            kind: "p",
            text: "Inventory strategies are adapted according to the characteristics of each product and market."
          }
        ]
      },
      {
        label: "Warehousing",
        title: "Safe and organized product handling",
        content: [
          {
            kind: "p",
            text: "Our warehousing approach is designed to support safe storage, accurate inventory management and efficient order fulfillment."
          },
          {
            kind: "list",
            label: "Capabilities can include:",
            items: [
              "Raw-material storage",
              "Finished-goods storage",
              "Controlled storage",
              "Inventory tracking",
              "Batch management",
              "Product segregation",
              "Packaging management",
              "Dispatch coordination"
            ]
          },
          {
            kind: "p",
            text: "Storage requirements are established according to product characteristics and applicable regulations."
          }
        ]
      },
      {
        label: "Logistics",
        title: "Moving products reliably",
        content: [
          {
            kind: "p",
            text: "Our logistics capabilities connect manufacturing facilities with customers and markets."
          },
          {
            kind: "list",
            label: "We coordinate with logistics partners across:",
            items: [
              "Road transportation",
              "Ocean freight",
              "Air freight",
              "Warehousing",
              "Distribution",
              "Domestic transportation",
              "International transportation"
            ]
          },
          {
            kind: "p",
            text: "Logistics strategies are selected according to product characteristics, destination, urgency, cost and customer requirements."
          }
        ]
      },
      {
        label: "Supply Chain Resilience",
        title: "Preparing for a changing industrial environment",
        content: [
          {
            kind: "p",
            text: "Global supply chains are increasingly affected by changing demand, transportation constraints, geopolitical developments, resource availability and market volatility."
          },
          {
            kind: "p",
            text: "Our resilience strategy focuses on:"
          },
          {
            kind: "items",
            items: [
              {
                title: "Diversification",
                text: "Developing alternative supply sources where appropriate."
              },
              {
                title: "Visibility",
                text: "Improving understanding of suppliers, materials and logistics."
              },
              {
                title: "Flexibility",
                text: "Maintaining the ability to adjust production and sourcing strategies."
              },
              {
                title: "Inventory Discipline",
                text: "Balancing availability with efficient inventory management."
              },
              {
                title: "Supplier Development",
                text: "Strengthening relationships with strategically important suppliers."
              },
              {
                title: "Continuity Planning",
                text: "Preparing for potential supply interruptions."
              }
            ]
          }
        ]
      }
    ],
  },
  {
    slug: "responsible-operations",
    label: "Responsible Operations",
    title: "Protecting People and Operations",
    lead: "Safety is an essential part of responsible manufacturing.",
    photo: categoryPhoto("machinery", "industrial-automation-electrical-control"),
    ogPhoto: "categories/machinery/industrial-automation-electrical-control.jpg",
    blocks: [
      {
        label: "Manufacturing Safety",
        title: "Protecting people and operations",
        content: [
          {
            kind: "list",
            label: "Our approach focuses on:",
            items: [
              "Safe operating procedures",
              "Equipment safety",
              "Process safety",
              "Employee training",
              "Risk assessment",
              "Emergency preparedness",
              "Incident prevention",
              "Continuous safety improvement"
            ]
          },
          {
            kind: "p",
            text: "The objective is to create manufacturing environments where people can perform their work safely and responsibly."
          }
        ]
      },
      {
        label: "Sustainable Manufacturing",
        title: "Efficiency that creates long-term value",
        content: [
          {
            kind: "p",
            text: "Sustainable manufacturing is closely connected to operational efficiency."
          },
          {
            kind: "list",
            label: "We seek opportunities to reduce:",
            items: [
              "Energy consumption",
              "Material waste",
              "Water consumption",
              "Production losses",
              "Packaging waste",
              "Unnecessary transportation",
              "Process inefficiencies"
            ]
          },
          {
            kind: "list",
            label: "We also explore:",
            items: [
              "Resource-efficient processes",
              "Circular materials",
              "Recycling",
              "Renewable energy",
              "Process optimization",
              "Sustainable packaging"
            ]
          }
        ]
      },
      {
        label: "Digital Manufacturing",
        title: "Connecting production with data",
        content: [
          {
            kind: "p",
            text: "Digital technologies can improve visibility, productivity and decision-making across manufacturing."
          },
          {
            kind: "list",
            label: "Our digital manufacturing initiatives explore:",
            items: [
              "Production monitoring",
              "Industrial data",
              "Process analytics",
              "Digital quality systems",
              "Predictive maintenance",
              "Production planning",
              "Automated reporting",
              "Equipment monitoring",
              "Manufacturing intelligence"
            ]
          },
          {
            kind: "p",
            text: "We aim to apply digital technology where it can create measurable operational improvements."
          }
        ]
      },
      {
        label: "Automation",
        title: "Improving precision and productivity",
        content: [
          {
            kind: "p",
            text: "Automation can improve consistency while reducing repetitive manual operations."
          },
          {
            kind: "list",
            label: "Potential applications include:",
            items: [
              "Automated production",
              "Material handling",
              "Packaging",
              "Inspection",
              "Warehousing",
              "Process control",
              "Robotics",
              "Automated data collection"
            ]
          },
          {
            kind: "p",
            text: "Automation strategies are developed around the specific requirements of each manufacturing environment."
          }
        ]
      }
    ],
  },
];
