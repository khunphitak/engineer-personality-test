// Questions adapted from "แบบทดสอบค้นหาสาขาวิศวกรรมที่ใช่"
// 48 statements, Likert 1–5, grouped into 6 engineering disciplines (8 per discipline)
//
// Discipline codes:
//   1 = Civil          (วิศวกรรมโยธา)
//   2 = Mechanical     (วิศวกรรมเครื่องกล)
//   3 = Industrial     (วิศวกรรมอุตสาหการ)
//   4 = Chemical       (วิศวกรรมเคมี)
//   5 = Electrical     (วิศวกรรมไฟฟ้า)
//   6 = Computer       (วิศวกรรมคอมพิวเตอร์)
//
// Items rotate: Q(n) -> discipline ((n-1) % 6) + 1

export interface Question {
  id: number
  textEn: string
  textTh: string
  discipline: number   // 1=Civil ... 6=Computer
}

export const DISCIPLINE_IDS = ['civil', 'mechanical', 'industrial', 'chemical', 'electrical', 'computer'] as const
export type DisciplineId = (typeof DISCIPLINE_IDS)[number]

export const questions: Question[] = [
  // ── Round 1 ──────────────────────────────────────────────────────────────
  { id: 1,  discipline: 1, textTh: 'ฉันสนใจว่าตึกสูงและสะพานรับน้ำหนักและต้านแรงลม/แผ่นดินไหวได้อย่างไร',
    textEn: 'I am curious about how skyscrapers and bridges bear loads and withstand wind or earthquake forces.' },
  { id: 2,  discipline: 2, textTh: 'ฉันชอบแกะเครื่องจักรหรือเครื่องยนต์ออกมาดูว่ามันทำงานอย่างไร',
    textEn: 'I enjoy taking machines or engines apart to understand how they work.' },
  
  { id: 5,  discipline: 5, textTh: 'ฉันสนใจว่าระบบไฟฟ้าและการส่งจ่ายพลังงานทำงานอย่างไร',
    textEn: 'I am interested in how electrical systems and power distribution work.' },
  
  // ── Round 2 ──────────────────────────────────────────────────────────────
  { id: 7,  discipline: 1, textTh: 'ฉันชอบออกไซต์ก่อสร้างและอยากเข้าใจขั้นตอนการสร้างอาคาร',
    textEn: 'I enjoy going to construction sites and want to understand each step of building a structure.' },
  { id: 8,  discipline: 2, textTh: 'ฉันสนใจเรื่องการเคลื่อนที่ กลไก เฟือง และระบบส่งกำลัง',
    textEn: 'I am fascinated by motion, mechanisms, gears, and power-transmission systems.' },
  { id: 9,  discipline: 3, textTh: 'ฉันสนใจการจัดการสายการผลิตและกระบวนการต่าง ๆ ในโรงงาน',
    textEn: 'I am interested in managing production lines and factory processes.' },
  { id: 10, discipline: 4, textTh: 'ฉันชอบเรียนวิชาเคมีและสนุกกับการทดลองในห้องแล็บ',
    textEn: 'I enjoy chemistry class and love doing laboratory experiments.' },
  { id: 11, discipline: 5, textTh: 'ฉันชอบต่อวงจรไฟฟ้า/อิเล็กทรอนิกส์และทดลองเล่นกับมัน',
    textEn: 'I love building electrical or electronic circuits and tinkering with them.' },
  { id: 12, discipline: 6, textTh: 'ฉันสนใจอัลกอริทึมและการแก้ปัญหาด้วยตรรกะอย่างเป็นขั้นตอน',
    textEn: 'I am drawn to algorithms and solving problems through step-by-step logic.' },

  // ── Round 3 ──────────────────────────────────────────────────────────────
  { id: 13, discipline: 1, textTh: 'ฉันสนใจวัสดุก่อสร้าง เช่น คอนกรีต เหล็ก และคุณสมบัติการรับแรง',
    textEn: 'I am interested in construction materials like concrete and steel, and how they bear loads.' },
  { id: 14, discipline: 2, textTh: 'ฉันสนใจเรื่องความร้อน พลังงาน และเครื่องยนต์ (อุณหพลศาสตร์)',
    textEn: 'I am interested in heat, energy, and engines (thermodynamics).' },
  { id: 15, discipline: 3, textTh: 'ฉันชอบวิเคราะห์ข้อมูลเพื่อปรับปรุงประสิทธิภาพการทำงาน',
    textEn: 'I enjoy analysing data to improve operational efficiency.' },
  { id: 16, discipline: 4, textTh: 'ฉันสนใจกระบวนการผลิตในโรงงาน เช่น ปิโตรเคมี อาหาร หรือยา',
    textEn: 'I am interested in industrial processes such as petrochemicals, food, or pharmaceuticals.' },
  { id: 17, discipline: 5, textTh: 'ฉันสนใจเรื่องสัญญาณ คลื่น และระบบการสื่อสาร',
    textEn: 'I am interested in signals, waves, and communication systems.' },
  

  // ── Round 4 ──────────────────────────────────────────────────────────────
  
  { id: 20, discipline: 2, textTh: 'ฉันชอบออกแบบชิ้นส่วนหรืออุปกรณ์ที่เคลื่อนไหวได้',
    textEn: 'I enjoy designing parts and devices that move.' },
  { id: 21, discipline: 3, textTh: 'ฉันสนใจระบบโลจิสติกส์ คลังสินค้า และห่วงโซ่อุปทาน',
    textEn: 'I am interested in logistics, warehousing, and supply-chain systems.' },
  { id: 22, discipline: 4, textTh: 'ฉันสนใจเรื่องการกลั่น การผสม และการแยกสาร',
    textEn: 'I am interested in distillation, mixing, and separation of substances.' },
  

  // ── Round 5 ──────────────────────────────────────────────────────────────
  { id: 25, discipline: 1, textTh: 'ฉันสนใจการวางผังเมือง ระบบถนน และการจัดการ/ระบายน้ำ',
    textEn: 'I am interested in urban planning, road networks, and water/drainage systems.' },
  { id: 26, discipline: 2, textTh: 'ฉันสนใจหุ่นยนต์ ระบบอัตโนมัติเชิงกล และแขนกล',
    textEn: 'I am interested in robots, mechanical automation, and robotic arms.' },
  { id: 27, discipline: 3, textTh: 'ฉันชอบวางแผน จัดตารางงาน และบริหารทรัพยากรให้คุ้มค่า',
    textEn: 'I enjoy planning, scheduling, and managing resources for maximum value.' },
  { id: 28, discipline: 4, textTh: 'ฉันใส่ใจความปลอดภัยของสารเคมีและการควบคุมปฏิกิริยาไม่ให้เกิดอันตราย',
    textEn: 'I care about chemical safety and controlling reactions to prevent hazards.' },
  
  

  // ── Round 6 ──────────────────────────────────────────────────────────────
  { id: 31, discipline: 1, textTh: 'ฉันภูมิใจกับงานที่จับต้องได้และคงอยู่ยาวนานเป็นสิบ ๆ ปี',
    textEn: 'I take pride in tangible work that lasts for decades.' },
  { id: 32, discipline: 2, textTh: 'ฉันชอบเขียนแบบ 3 มิติ (CAD) ของชิ้นส่วนเครื่องกล',
    textEn: 'I enjoy creating 3D CAD drawings of mechanical parts.' },
  
  { id: 34, discipline: 4, textTh: 'ฉันสนใจการพัฒนาวัสดุใหม่ พอลิเมอร์ หรือพลังงานชีวภาพ',
    textEn: 'I am interested in developing new materials, polymers, or bio-energy.' },
  { id: 35, discipline: 5, textTh: 'ฉันสนใจพลังงานหมุนเวียน เช่น โซลาร์เซลล์ และระบบไฟฟ้ากำลัง',
    textEn: 'I am interested in renewable energy like solar cells and power systems.' },
  

  // ── Round 7 ──────────────────────────────────────────────────────────────
  { id: 37, discipline: 1, textTh: 'ฉันชอบวิเคราะห์แรงในโครงสร้าง (คาน เสา ฐานราก) ว่าจะไม่พังได้อย่างไร',
    textEn: 'I enjoy analysing forces on structural elements (beams, columns, foundations) to ensure they won’t fail.' },
  { id: 38, discipline: 2, textTh: 'ฉันสนใจยานยนต์ อากาศยาน หรือระบบขับเคลื่อนต่าง ๆ',
    textEn: 'I am interested in vehicles, aircraft, and propulsion systems.' },
  { id: 39, discipline: 3, textTh: 'ฉันชอบงานที่เชื่อมโยงทั้งคน เครื่องจักร และระบบเข้าด้วยกัน',
    textEn: 'I enjoy work that connects people, machines, and systems together.' },
  { id: 40, discipline: 4, textTh: 'ฉันสนใจเรื่องสิ่งแวดล้อม การบำบัดของเสีย และกระบวนการที่ยั่งยืน',
    textEn: 'I care about the environment, waste treatment, and sustainable processes.' },
  { id: 41, discipline: 5, textTh: 'ฉันชอบวิเคราะห์วงจรไฟฟ้าด้วยคณิตศาสตร์และฟิสิกส์',
    textEn: 'I enjoy analysing electrical circuits using mathematics and physics.' },
  

  // ── Round 8 ──────────────────────────────────────────────────────────────
  { id: 43, discipline: 1, textTh: 'ฉันสนใจเรื่องดิน ธรณีวิทยา และผลกระทบต่อการก่อสร้าง',
    textEn: 'I am interested in soil, geology, and how they affect construction.' },
  { id: 44, discipline: 2, textTh: 'ฉันชอบหาสาเหตุว่าทำไมเครื่องจักรสั่น ร้อนเกินไป หรือเสียหาย',
    textEn: 'I enjoy diagnosing why machines vibrate, overheat, or break down.' },
  { id: 45, discipline: 3, textTh: 'ฉันสนใจสถิติและการวิจัยดำเนินงาน (Optimization) เพื่อหาทางที่ดีที่สุด',
    textEn: 'I am interested in statistics and operations research (optimization) to find the best solution.' },
  { id: 46, discipline: 4, textTh: 'ฉันชอบคำนวณสมดุลมวลและพลังงานของกระบวนการผลิต',
    textEn: 'I enjoy computing mass and energy balances of production processes.' },
  { id: 47, discipline: 5, textTh: 'ฉันสนใจการออกแบบแผงวงจรและชิปอิเล็กทรอนิกส์',
    textEn: 'I am interested in designing circuit boards and electronic chips.' },
  { id: 48, discipline: 6, textTh: 'ฉันชอบเรียนรู้ภาษาโปรแกรมและเทคโนโลยีใหม่ ๆ อยู่เสมอ',
    textEn: 'I love learning new programming languages and emerging technologies.' },

  // ── Round 9 — Everyday-life scenarios (3.2) ──────────────────────────────
  { id: 49, discipline: 1, textTh: 'เวลาเดินทางผ่านสะพานหรือทางด่วน ฉันมักสังเกตโครงสร้างและสงสัยว่าสร้างอย่างไร',
    textEn: 'When passing over a bridge or expressway, I notice the structure and wonder how it was built.' },
  { id: 50, discipline: 2, textTh: 'เวลาของใช้ในบ้าน (พัดลม จักรยาน) เสีย ฉันมักลองแกะออกมาซ่อมเอง',
    textEn: 'When household items (a fan, a bike) break, I usually try to open them up and fix them myself.' },
  { id: 51, discipline: 3, textTh: 'เวลาต่อคิวหรือร้านบริการช้า ฉันมักคิดว่าจัดระบบใหม่ให้เร็วขึ้นได้อย่างไร',
    textEn: 'When stuck in a slow queue or service line, I find myself thinking about how to re-organise it for speed.' },
  { id: 52, discipline: 4, textTh: 'เวลาทำอาหารหรือผสมเครื่องดื่ม ฉันสนใจว่าอุณหภูมิ/สัดส่วนเปลี่ยนผลลัพธ์อย่างไร',
    textEn: 'While cooking or mixing drinks, I am curious how temperature and proportions change the result.' },
  { id: 53, discipline: 5, textTh: 'เวลาอุปกรณ์ไฟฟ้าในบ้านมีปัญหา ฉันชอบหาสาเหตุเรื่องวงจร/ปลั๊ก/ฟิวส์เอง',
    textEn: 'When a home appliance has issues, I enjoy diagnosing the circuit, plug, or fuse myself.' },
  { id: 54, discipline: 6, textTh: 'เวลาคอมหรือมือถือมีปัญหา ฉันชอบลองแก้ไขเองก่อนเรียกช่าง',
    textEn: 'When my computer or phone has problems, I prefer to troubleshoot myself before calling a technician.' },

  // ── Round 10 ─────────────────────────────────────────────────────────────
  { id: 55, discipline: 1, textTh: 'เวลาฝนตกหนักน้ำท่วม ฉันคิดถึงว่าระบบระบายน้ำของเมืองควรปรับปรุงอย่างไร',
    textEn: 'During heavy rain or floods, I think about how the city’s drainage system should be improved.' },
  { id: 56, discipline: 2, textTh: 'ฉันชอบสังเกตว่าเครื่องใช้ไฟฟ้า/รถยนต์ทำงานเงียบหรือสั่นผิดปกติหรือไม่',
    textEn: 'I notice whether appliances or vehicles run quietly or vibrate abnormally.' },
  { id: 57, discipline: 3, textTh: 'ฉันชอบจัดบ้าน จัดโต๊ะ หรือวางแผนงานให้เป็นระเบียบและมีประสิทธิภาพ',
    textEn: 'I enjoy organising my home, desk, or schedule into neat, efficient systems.' },
  { id: 58, discipline: 4, textTh: 'ฉันชอบอ่านส่วนผสมบนฉลากผลิตภัณฑ์และสงสัยว่าแต่ละอย่างทำหน้าที่อะไร',
    textEn: 'I read the ingredient labels on products and wonder what role each component plays.' },
  { id: 59, discipline: 5, textTh: 'ฉันสนใจว่าแบตเตอรี่มือถือและเครื่องชาร์จทำงานและเสื่อมสภาพอย่างไร',
    textEn: 'I am curious about how phone batteries and chargers work and degrade over time.' },
  { id: 60, discipline: 6, textTh: 'ฉันชอบตั้งค่าแอปหรือเขียนสูตร/สคริปต์เล็ก ๆ เพื่อทำงานซ้ำ ๆ ให้อัตโนมัติ',
    textEn: 'I enjoy setting up apps or writing small formulas/scripts to automate repetitive work.' },

  // ── Round 11 — เพิ่มเติม ─────────────────────────────────────────────────
  { id: 61, discipline: 2, textTh: 'เวลาเห็นของพัง ฉันอยากแกะดูข้างในมากกว่าจะทิ้งไป',
    textEn: 'When I see something broken, I want to open it up and look inside rather than throw it away.' },
  { id: 62, discipline: 6, textTh: 'ฉันรู้สึกพอใจเมื่อเข้าใจว่า "ทำไม" สิ่งหนึ่งถึงทำงานได้ ไม่ใช่แค่ใช้มันเป็น',
    textEn: 'I feel satisfied when I understand "why" something works, not just how to use it.' },
]
