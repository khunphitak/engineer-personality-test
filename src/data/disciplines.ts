import { DisciplineId } from './questions'

export interface Discipline {
  id: DisciplineId
  code: string                // C, M, I, Ch, E, Co
  nameEn: string
  nameTh: string
  descEn: string
  descTh: string
  strengthsEn: string
  strengthsTh: string
  rolesEn: string             // career paths
  rolesTh: string
  icon: string
  color: string
  archetype: string           // legacy archetype mapping for the type-confidence UI
}

export interface DisciplineScore {
  id: DisciplineId
  discipline: Discipline
  rawScore: number            // 8–40
  percent: number             // 0–100
  score: number               // alias of percent for legacy UI
}

export const disciplines: Discipline[] = [
  {
    id: 'civil',
    code: 'C',
    nameEn: 'Civil Engineering',
    nameTh: 'วิศวกรรมโยธา',
    descEn: 'Designs and oversees the construction of buildings, bridges, roads, dams, and water infrastructure.',
    descTh: 'ออกแบบและควบคุมการก่อสร้างอาคาร สะพาน ถนน เขื่อน และระบบประปา',
    strengthsEn: 'Hands-on, big-picture thinker, safety-focused, comfortable with fieldwork.',
    strengthsTh: 'ชอบงานจับต้องได้ มองภาพใหญ่ ใส่ใจความปลอดภัย อดทนกับงานภาคสนาม',
    rolesEn: 'Structural Engineer · Site Engineer · Transportation Engineer · Construction Consultant · Public Works Officer',
    rolesTh: 'วิศวกรโครงสร้าง, วิศวกรสนาม, วิศวกรขนส่ง, ที่ปรึกษาก่อสร้าง, งานราชการด้านโยธาธิการ',
    icon: '🏗️',
    color: '#D97706',
    archetype: 'builder',
  },
  {
    id: 'mechanical',
    code: 'M',
    nameEn: 'Mechanical Engineering',
    nameTh: 'วิศวกรรมเครื่องกล',
    descEn: 'Designs machines, engines, refrigeration systems, robots, vehicles, and power-transmission systems.',
    descTh: 'ออกแบบเครื่องจักร เครื่องยนต์ ระบบทำความเย็น หุ่นยนต์ ยานยนต์ และระบบส่งกำลัง',
    strengthsEn: 'Loves mechanisms, drawn to motion/energy/heat, enjoys designing things that move.',
    strengthsTh: 'ชอบเข้าใจกลไก สนใจการเคลื่อนที่ พลังงานและความร้อน ชอบออกแบบสิ่งที่ขยับได้',
    rolesEn: 'Mechanical Designer · Automotive/Aerospace Engineer · Maintenance Engineer · Robotics / Mechatronics Engineer',
    rolesTh: 'วิศวกรออกแบบเครื่องกล, วิศวกรยานยนต์/อากาศยาน, วิศวกรซ่อมบำรุง, วิศวกรหุ่นยนต์/เมคคาทรอนิกส์',
    icon: '⚙️',
    color: '#0D9488',
    archetype: 'architect',
  },
  {
    id: 'industrial',
    code: 'I',
    nameEn: 'Industrial Engineering',
    nameTh: 'วิศวกรรมอุตสาหการ',
    descEn: 'Improves processes, reduces cost, manages quality, logistics, and supply chains for maximum efficiency.',
    descTh: 'ปรับปรุงกระบวนการผลิต ลดต้นทุน บริหารคุณภาพ โลจิสติกส์ และห่วงโซ่อุปทานให้มีประสิทธิภาพสูงสุด',
    strengthsEn: 'Systems-level thinker, efficiency-oriented, great planner, connects people-machines-data.',
    strengthsTh: 'มองภาพรวมของระบบ คิดเชิงประสิทธิภาพ ชอบวางแผนและจัดการ เชื่อมโยงคน-เครื่อง-ข้อมูล',
    rolesEn: 'Process Engineer · Quality Engineer · Production Planner · Efficiency Consultant · Plant Manager',
    rolesTh: 'วิศวกรกระบวนการ, วิศวกรคุณภาพ, นักวางแผนการผลิต, ที่ปรึกษาปรับปรุงประสิทธิภาพ, ผู้จัดการโรงงาน',
    icon: '📊',
    color: '#2563EB',
    archetype: 'connector',
  },
  {
    id: 'chemical',
    code: 'Ch',
    nameEn: 'Chemical Engineering',
    nameTh: 'วิศวกรรมเคมี',
    descEn: 'Designs and controls processes in petrochemicals, food, pharma, energy, and waste treatment.',
    descTh: 'ออกแบบและควบคุมกระบวนการผลิตในอุตสาหกรรมปิโตรเคมี อาหาร ยา พลังงาน และการบำบัดของเสีย',
    strengthsEn: 'Loves chemistry and lab work, safety-minded, process-oriented thinker.',
    strengthsTh: 'ชอบเคมีและการทดลอง ใส่ใจความปลอดภัยและสิ่งแวดล้อม คิดเชิงกระบวนการ',
    rolesEn: 'Chemical Process Engineer · Plant Engineer · Safety Engineer · R&D Engineer · Environmental Engineer',
    rolesTh: 'วิศวกรกระบวนการเคมี, วิศวกรโรงงาน, วิศวกรความปลอดภัย, นักวิจัยและพัฒนา (R&D), วิศวกรสิ่งแวดล้อม',
    icon: '🧪',
    color: '#EA580C',
    archetype: 'builder',
  },
  {
    id: 'electrical',
    code: 'E',
    nameEn: 'Electrical Engineering',
    nameTh: 'วิศวกรรมไฟฟ้า',
    descEn: 'Designs power systems, electronic circuits, communication systems, control systems, and renewable energy.',
    descTh: 'ออกแบบระบบไฟฟ้ากำลัง วงจรอิเล็กทรอนิกส์ ระบบสื่อสาร ระบบควบคุมอัตโนมัติ และพลังงานหมุนเวียน',
    strengthsEn: 'Loves circuits and electronics, strong math/physics thinker, drawn to signals and energy.',
    strengthsTh: 'ชอบวงจรและอิเล็กทรอนิกส์ คิดเชิงคณิตศาสตร์/ฟิสิกส์ได้ดี สนใจสัญญาณและพลังงาน',
    rolesEn: 'Power Engineer · Electronics Engineer · Control Systems Engineer · Telecom Engineer · Energy Engineer',
    rolesTh: 'วิศวกรไฟฟ้ากำลัง, วิศวกรอิเล็กทรอนิกส์, วิศวกรระบบควบคุม, วิศวกรโทรคมนาคม, วิศวกรพลังงาน',
    icon: '⚡',
    color: '#FACC15',
    archetype: 'architect',
  },
  {
    id: 'computer',
    code: 'Co',
    nameEn: 'Computer Engineering',
    nameTh: 'วิศวกรรมคอมพิวเตอร์',
    descEn: 'Develops software, apps, websites, AI systems, databases, networks, and cybersecurity.',
    descTh: 'พัฒนาซอฟต์แวร์ แอป เว็บไซต์ ระบบ AI ฐานข้อมูล เครือข่าย และความปลอดภัยไซเบอร์',
    strengthsEn: 'Loves coding and logic, fast tech learner, deep focus, abstract systems thinker.',
    strengthsTh: 'ชอบเขียนโค้ดและคิดเชิงตรรกะ เรียนรู้เทคโนโลยีใหม่ได้เร็ว นั่งจดจ่อกับงานได้นาน',
    rolesEn: 'Software Developer · Data/AI Engineer · Systems/Network Engineer · Cybersecurity Specialist · Software Architect',
    rolesTh: 'นักพัฒนาซอฟต์แวร์, วิศวกรข้อมูล/AI, วิศวกรระบบ/เครือข่าย, ผู้เชี่ยวชาญความปลอดภัยไซเบอร์, สถาปนิกซอฟต์แวร์',
    icon: '💻',
    color: '#6B46C1',
    archetype: 'architect',
  },
]

export function getDisciplineById(id: string): Discipline | undefined {
  return disciplines.find(d => d.id === id)
}

// Discipline label per Likert-fit tier (% of max=40)
export function disciplineTier(percent: number): 'excellent' | 'good' | 'moderate' | 'low' {
  if (percent >= 80) return 'excellent'
  if (percent >= 60) return 'good'
  if (percent >= 40) return 'moderate'
  return 'low'
}
