export interface EngineerType {
  id: string
  name: string
  code: string
  color: string
  darkColor: string
  traits: string[]
  tagline: string
  quote: string
  quoteAuthor: string
  intro: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  workingStyle: string
  collaborationTips: string
  famousEngineers: { name: string; role: string }[]
  th?: TypeTranslation
}

// Thai translation of the localizable fields (color/id/famous names stay the same)
export interface TypeTranslation {
  name: string
  tagline: string
  traits: string[]
  quote: string
  quoteAuthor: string
  intro: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  workingStyle: string
  collaborationTips: string
  famousRoles: string[]
}

export const engineerTypes: EngineerType[] = [
  {
    id: 'architect',
    name: 'Architect',
    code: 'ARCHITECT',
    color: '#7B2FBE',
    darkColor: '#3B0086',
    traits: ['SYSTEMATIC', 'INDEPENDENT', 'PRECISE', 'STRATEGIC'],
    tagline: 'Systematic minds who design elegant, scalable systems.',
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    quoteAuthor: 'Martin Fowler',
    intro: [
      'The Architect is a rare breed — someone who doesn\'t just write code, but thinks deeply about how systems should work at a fundamental level. They are drawn to the elegance of a well-designed solution and uncomfortable with unnecessary complexity.',
      'At their best, Architects are the engineers others turn to when faced with a hard problem. They can hold enormous system complexity in their minds, see failure modes others miss, and produce solutions that stand the test of time.',
      'While they can sometimes struggle with the social aspects of engineering, their technical depth is unmatched. They thrive when given the autonomy to solve problems the right way — not just the fast way.',
    ],
    strengths: [
      'Deep systems thinking across entire codebases',
      'Writes clean, maintainable, future-proof code',
      'Excellent at spotting architectural flaws early',
      'Works independently with high output',
      'Strong long-term technical planning',
    ],
    weaknesses: [
      'May over-engineer solutions',
      'Can be slow to ship due to perfectionism',
      'Sometimes a poor communicator',
      'Resistant to "good enough" pragmatism',
      'May neglect team dynamics',
    ],
    careers: ['Software Architect', 'Principal Engineer', 'Platform Engineer', 'Tech Lead (IC track)'],
    workingStyle: 'Prefers async communication, detailed design docs before implementation, and long uninterrupted focus sessions.',
    collaborationTips: 'Give them clear problem statements, not solutions. Avoid micromanaging. Schedule fewer but deeper meetings.',
    famousEngineers: [
      { name: 'Linus Torvalds', role: 'Creator of Linux & Git' },
      { name: 'John Carmack', role: 'id Software, Oculus' },
      { name: 'Donald Knuth', role: 'The Art of Computer Programming' },
      { name: 'Rob Pike', role: 'Go Language, Unix' },
    ],
    th: {
      name: 'นักออกแบบระบบ',
      tagline: 'นักคิดเชิงระบบที่ออกแบบโซลูชันอันสง่างามและขยายขนาดได้',
      traits: ['เป็นระบบ', 'อิสระ', 'แม่นยำ', 'มองกลยุทธ์'],
      quote: 'ใครก็เขียนโค้ดที่คอมพิวเตอร์เข้าใจได้ แต่โปรแกรมเมอร์ที่ดีเขียนโค้ดที่มนุษย์เข้าใจได้',
      quoteAuthor: 'Martin Fowler',
      intro: [
        'Architect เป็นวิศวกรประเภทหายาก — คนที่ไม่ได้แค่เขียนโค้ด แต่คิดลึกถึงว่าระบบควรทำงานอย่างไรในระดับพื้นฐาน พวกเขาหลงใหลในความสง่างามของโซลูชันที่ออกแบบมาอย่างดี และอึดอัดกับความซับซ้อนที่ไม่จำเป็น',
        'ในจุดที่ดีที่สุด Architect คือวิศวกรที่คนอื่นหันไปหาเมื่อเจอปัญหายาก พวกเขาสามารถเก็บความซับซ้อนของระบบมหาศาลไว้ในหัว มองเห็นจุดที่ระบบจะล้มเหลวที่คนอื่นมองข้าม และสร้างโซลูชันที่ทนทานต่อกาลเวลา',
        'แม้บางครั้งพวกเขาอาจมีปัญหากับแง่มุมทางสังคมของงานวิศวกรรม แต่ความลึกทางเทคนิคของพวกเขาไม่มีใครเทียบ พวกเขาเปล่งประกายเมื่อได้รับอิสระในการแก้ปัญหาด้วยวิธีที่ถูกต้อง ไม่ใช่แค่วิธีที่เร็ว',
      ],
      strengths: [
        'คิดเชิงระบบอย่างลึกซึ้งทั่วทั้งโค้ดเบส',
        'เขียนโค้ดที่สะอาด ดูแลรักษาง่าย และรองรับอนาคต',
        'เก่งในการมองเห็นข้อบกพร่องเชิงสถาปัตยกรรมตั้งแต่เนิ่นๆ',
        'ทำงานได้อย่างอิสระโดยมีผลงานสูง',
        'วางแผนทางเทคนิคระยะยาวได้ดี',
      ],
      weaknesses: [
        'อาจออกแบบเกินความจำเป็น',
        'อาจส่งงานช้าเพราะความสมบูรณ์แบบนิยม',
        'บางครั้งสื่อสารได้ไม่ดี',
        'ต้านทานความเป็นจริงแบบ "พอใช้ได้"',
        'อาจละเลยพลวัตของทีม',
      ],
      careers: ['Software Architect', 'Principal Engineer', 'Platform Engineer', 'Tech Lead (สาย IC)'],
      workingStyle: 'ชอบการสื่อสารแบบ async เขียนเอกสารออกแบบอย่างละเอียดก่อนลงมือ และต้องการช่วงเวลาโฟกัสยาวๆ ที่ไม่ถูกขัดจังหวะ',
      collaborationTips: 'ให้โจทย์ปัญหาที่ชัดเจน ไม่ใช่คำตอบสำเร็จรูป หลีกเลี่ยงการจู้จี้ และจัดประชุมให้น้อยลงแต่ลึกขึ้น',
      famousRoles: ['ผู้สร้าง Linux และ Git', 'id Software, Oculus', 'The Art of Computer Programming', 'ภาษา Go, Unix'],
    },
  },
  {
    id: 'builder',
    name: 'Builder',
    code: 'BUILDER',
    color: '#0D9488',
    darkColor: '#1A5C5C',
    traits: ['RELIABLE', 'PRAGMATIC', 'STRUCTURED', 'DELIVERY-FOCUSED'],
    tagline: 'Reliable builders who ship quality software on time, every time.',
    quote: 'First, solve the problem. Then, write the code.',
    quoteAuthor: 'John Johnson',
    intro: [
      'The Builder is the backbone of any engineering team. Where others see ambiguity, the Builder sees a roadmap. They break complex problems into manageable pieces, execute methodically, and deliver consistently — sprint after sprint.',
      'Builders are the engineers every manager loves: reliable estimators, clear communicators, and disciplined practitioners. They value good process not as an end in itself, but because it produces good outcomes.',
      'Their pragmatism is their superpower. They ship. They document. They reduce bus factor. If you want something done and done well, give it to a Builder.',
    ],
    strengths: [
      'Consistently delivers on time',
      'Excellent at scoping and estimation',
      'Strong process discipline',
      'High-quality output with low rework',
      'Great at documentation',
    ],
    weaknesses: [
      'May resist changes mid-sprint',
      'Less innovative, prefers proven solutions',
      'Can struggle with ambiguous requirements',
      'May be inflexible under shifting priorities',
      'Sometimes avoids technical risk-taking',
    ],
    careers: ['Senior Software Engineer', 'Engineering Manager', 'DevOps Engineer', 'Release Engineer'],
    workingStyle: 'Thrives with clear tickets, defined acceptance criteria, and predictable sprint cycles.',
    collaborationTips: 'Define requirements clearly upfront. Respect their process. Avoid last-minute scope changes.',
    famousEngineers: [
      { name: 'Grace Hopper', role: 'COBOL, Naval Computing' },
      { name: 'Margaret Hamilton', role: 'Apollo Guidance Software' },
      { name: 'Jeff Dean', role: 'Google Infrastructure' },
      { name: 'Sanjay Ghemawat', role: 'Google MapReduce, BigTable' },
    ],
    th: {
      name: 'นักสร้าง',
      tagline: 'นักสร้างที่เชื่อถือได้ ส่งมอบซอฟต์แวร์คุณภาพตรงเวลาทุกครั้ง',
      traits: ['เชื่อถือได้', 'เน้นปฏิบัติได้จริง', 'มีโครงสร้าง', 'เน้นการส่งมอบ'],
      quote: 'แก้ปัญหาให้ได้ก่อน แล้วค่อยเขียนโค้ด',
      quoteAuthor: 'John Johnson',
      intro: [
        'Builder คือกระดูกสันหลังของทีมวิศวกรรม ในขณะที่คนอื่นเห็นความคลุมเครือ Builder เห็นแผนที่นำทาง พวกเขาแยกปัญหาที่ซับซ้อนออกเป็นชิ้นเล็กๆ ที่จัดการได้ ลงมืออย่างเป็นระบบ และส่งมอบอย่างสม่ำเสมอทุก sprint',
        'Builder คือวิศวกรที่ผู้จัดการทุกคนรัก — ประเมินงานได้แม่นยำ สื่อสารชัดเจน และมีวินัยในการทำงาน พวกเขาเห็นคุณค่าของกระบวนการที่ดี ไม่ใช่เพื่อตัวมันเอง แต่เพราะมันสร้างผลลัพธ์ที่ดี',
        'ความเน้นปฏิบัติได้จริงคือพลังพิเศษของพวกเขา พวกเขาส่งงาน เขียนเอกสาร และลดความเสี่ยงของทีม ถ้าคุณอยากให้งานเสร็จและเสร็จอย่างดี มอบให้ Builder',
      ],
      strengths: [
        'ส่งมอบงานตรงเวลาอย่างสม่ำเสมอ',
        'เก่งในการกำหนดขอบเขตและประเมินงาน',
        'มีวินัยในกระบวนการทำงานสูง',
        'ผลงานคุณภาพสูง แก้ไขซ้ำน้อย',
        'เขียนเอกสารได้ยอดเยี่ยม',
      ],
      weaknesses: [
        'อาจต้านการเปลี่ยนแปลงกลาง sprint',
        'สร้างสรรค์น้อยกว่า ชอบโซลูชันที่พิสูจน์แล้ว',
        'อาจมีปัญหากับความต้องการที่คลุมเครือ',
        'อาจยืดหยุ่นยากเมื่อลำดับความสำคัญเปลี่ยน',
        'บางครั้งเลี่ยงการเสี่ยงทางเทคนิค',
      ],
      careers: ['Senior Software Engineer', 'Engineering Manager', 'DevOps Engineer', 'Release Engineer'],
      workingStyle: 'ทำงานได้ดีกับ ticket ที่ชัดเจน เกณฑ์การยอมรับที่กำหนดไว้ และรอบ sprint ที่คาดเดาได้',
      collaborationTips: 'กำหนดความต้องการให้ชัดเจนตั้งแต่ต้น เคารพกระบวนการของพวกเขา และหลีกเลี่ยงการเปลี่ยนขอบเขตงานนาทีสุดท้าย',
      famousRoles: ['COBOL, การคำนวณกองทัพเรือ', 'ซอฟต์แวร์นำทาง Apollo', 'โครงสร้างพื้นฐาน Google', 'Google MapReduce, BigTable'],
    },
  },
  {
    id: 'catalyst',
    name: 'Catalyst',
    code: 'CATALYST',
    color: '#EA580C',
    darkColor: '#7E3D1A',
    traits: ['INNOVATIVE', 'CURIOUS', 'EXPERIMENTAL', 'FAST-MOVING'],
    tagline: 'Creative problem-solvers who love exploring uncharted territory.',
    quote: 'Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.',
    quoteAuthor: 'Mark Zuckerberg',
    intro: [
      'The Catalyst is the spark plug of the team — the engineer who gets excited about what\'s possible and can\'t help but start building. They are drawn to novel problems, new technologies, and the thrill of creating something from nothing.',
      'Catalysts often produce the breakthrough ideas and early prototypes that define the future direction of a product. They thrive in startup environments, R&D labs, and any place where exploration is valued over process.',
      'Their energy is infectious. While they might leave a trail of unfinished projects, the ones that work often become the team\'s most important initiatives. Pair a Catalyst with a Builder and you have a formidable duo.',
    ],
    strengths: [
      'Rapid prototyping and idea validation',
      'Generates creative solutions to hard problems',
      'Thrives in ambiguity and unstructured environments',
      'Early adopter and champion of new technology',
      'High energy and team enthusiasm',
    ],
    weaknesses: [
      'May leave projects unfinished',
      'Inconsistent code quality',
      'Gets bored by maintenance and legacy work',
      'Can be disorganized and hard to plan around',
      'May introduce unnecessary complexity',
    ],
    careers: ['R&D Engineer', 'Startup Engineer', 'Developer Advocate', 'Innovation Lab Engineer'],
    workingStyle: 'Needs creative freedom and time to explore. Dislikes rigid processes. Motivated by novel challenges.',
    collaborationTips: 'Give them open-ended problems. Accept messy first drafts. Pair with a Builder for delivery balance.',
    famousEngineers: [
      { name: 'Steve Wozniak', role: 'Apple I & II' },
      { name: 'Elon Musk', role: 'Tesla, SpaceX' },
      { name: 'Bret Victor', role: 'Inventing on Principle' },
      { name: 'Aaron Swartz', role: 'RSS, Reddit, Creative Commons' },
    ],
    th: {
      name: 'นักจุดประกาย',
      tagline: 'นักแก้ปัญหาเชิงสร้างสรรค์ที่รักการสำรวจดินแดนที่ยังไม่มีใครไปถึง',
      traits: ['สร้างสรรค์', 'ช่างสงสัย', 'ชอบทดลอง', 'เคลื่อนไหวเร็ว'],
      quote: 'เคลื่อนที่เร็วและทำลายสิ่งต่างๆ ถ้าคุณยังไม่ทำอะไรพัง แสดงว่าคุณยังเคลื่อนที่ไม่เร็วพอ',
      quoteAuthor: 'Mark Zuckerberg',
      intro: [
        'Catalyst คือหัวเทียนของทีม — วิศวกรที่ตื่นเต้นกับความเป็นไปได้และอดไม่ได้ที่จะเริ่มลงมือสร้าง พวกเขาถูกดึงดูดด้วยปัญหาใหม่ๆ เทคโนโลยีใหม่ๆ และความตื่นเต้นในการสร้างบางสิ่งจากความว่างเปล่า',
        'Catalyst มักสร้างไอเดียที่ก้าวกระโดดและต้นแบบยุคแรกที่กำหนดทิศทางอนาคตของผลิตภัณฑ์ พวกเขาเปล่งประกายในสภาพแวดล้อมสตาร์ทอัพ ห้องวิจัย และทุกที่ที่ให้ค่าการสำรวจมากกว่ากระบวนการ',
        'พลังของพวกเขาแพร่กระจายได้ แม้พวกเขาอาจทิ้งโปรเจกต์ที่ยังไม่เสร็จไว้เป็นทาง แต่อันที่สำเร็จมักกลายเป็นโครงการที่สำคัญที่สุดของทีม จับ Catalyst คู่กับ Builder แล้วคุณจะได้คู่หูที่น่าเกรงขาม',
      ],
      strengths: [
        'สร้างต้นแบบและทดสอบไอเดียได้รวดเร็ว',
        'สร้างโซลูชันสร้างสรรค์ให้ปัญหายากๆ',
        'เปล่งประกายในความคลุมเครือและสภาพแวดล้อมที่ไม่มีโครงสร้าง',
        'เป็นผู้ใช้รุ่นแรกและผู้สนับสนุนเทคโนโลยีใหม่',
        'พลังงานสูงและสร้างความกระตือรือร้นให้ทีม',
      ],
      weaknesses: [
        'อาจทิ้งโปรเจกต์ไว้ไม่เสร็จ',
        'คุณภาพโค้ดไม่สม่ำเสมอ',
        'เบื่อกับงานบำรุงรักษาและงานระบบเก่า',
        'อาจไม่เป็นระเบียบและวางแผนตามได้ยาก',
        'อาจสร้างความซับซ้อนที่ไม่จำเป็น',
      ],
      careers: ['R&D Engineer', 'Startup Engineer', 'Developer Advocate', 'Innovation Lab Engineer'],
      workingStyle: 'ต้องการอิสระในการสร้างสรรค์และเวลาในการสำรวจ ไม่ชอบกระบวนการที่เข้มงวด มีแรงจูงใจจากความท้าทายใหม่ๆ',
      collaborationTips: 'ให้โจทย์ปลายเปิด ยอมรับร่างแรกที่ยังไม่เรียบร้อย และจับคู่กับ Builder เพื่อสมดุลการส่งมอบ',
      famousRoles: ['Apple I & II', 'Tesla, SpaceX', 'Inventing on Principle', 'RSS, Reddit, Creative Commons'],
    },
  },
  {
    id: 'connector',
    name: 'Connector',
    code: 'CONNECTOR',
    color: '#2563EB',
    darkColor: '#1A3D7E',
    traits: ['COLLABORATIVE', 'EMPATHETIC', 'COMMUNICATIVE', 'USER-FOCUSED'],
    tagline: 'Bridge-builders who translate between technology and people.',
    quote: 'The best way to predict the future is to invent it.',
    quoteAuthor: 'Alan Kay',
    intro: [
      'The Connector is the engineer who makes teams work. They are the bridge between technical and non-technical worlds — translating complex engineering concepts into business value, and business needs into technical requirements.',
      'Connectors are often the most impactful engineers in an organization, even if they are not always the most technically deep. They elevate everyone around them through mentoring, facilitation, and communication.',
      'They care deeply about the humans on both sides of the software — the users who interact with it and the engineers who build it. In a world that increasingly requires collaboration across functions, the Connector is invaluable.',
    ],
    strengths: [
      'Excellent cross-team communicator',
      'Strong at gathering and refining requirements',
      'Great mentor and culture builder',
      'User-centric decision making',
      'Builds strong team cohesion',
    ],
    weaknesses: [
      'May avoid deep solo technical work',
      'Can be indecisive under pressure',
      'Sometimes over-prioritizes consensus',
      'May lack strong technical opinions',
      'Slower in isolated deep-work tasks',
    ],
    careers: ['Engineering Manager', 'Staff Engineer', 'Product-minded Engineer', 'Developer Relations'],
    workingStyle: 'Energized by collaboration, 1:1s, team rituals, and customer interaction. Thrives in cross-functional environments.',
    collaborationTips: 'Involve them in planning early. Value their soft-skill contributions. Give them space to facilitate discussions.',
    famousEngineers: [
      { name: 'Satya Nadella', role: 'Microsoft CEO' },
      { name: 'Vint Cerf', role: 'Father of the Internet' },
      { name: 'Sheryl Sandberg', role: 'Facebook COO' },
      { name: 'Susan Wojcicki', role: 'YouTube CEO' },
    ],
    th: {
      name: 'นักเชื่อมโยง',
      tagline: 'นักสร้างสะพานที่แปลภาษาระหว่างเทคโนโลยีกับผู้คน',
      traits: ['ร่วมมือ', 'เข้าอกเข้าใจ', 'สื่อสารเก่ง', 'เน้นผู้ใช้'],
      quote: 'วิธีที่ดีที่สุดในการทำนายอนาคต คือการสร้างมันขึ้นมา',
      quoteAuthor: 'Alan Kay',
      intro: [
        'Connector คือวิศวกรที่ทำให้ทีมเดินหน้าได้ พวกเขาคือสะพานเชื่อมระหว่างโลกเทคนิคและไม่เทคนิค — แปลแนวคิดวิศวกรรมที่ซับซ้อนให้เป็นคุณค่าทางธุรกิจ และแปลความต้องการทางธุรกิจให้เป็นข้อกำหนดทางเทคนิค',
        'Connector มักเป็นวิศวกรที่สร้างผลกระทบมากที่สุดในองค์กร แม้อาจไม่ใช่คนที่ลึกทางเทคนิคที่สุด พวกเขายกระดับทุกคนรอบตัวผ่านการเป็นพี่เลี้ยง การอำนวยความสะดวก และการสื่อสาร',
        'พวกเขาใส่ใจมนุษย์ทั้งสองฝั่งของซอฟต์แวร์อย่างลึกซึ้ง — ทั้งผู้ใช้ที่โต้ตอบกับมันและวิศวกรที่สร้างมัน ในโลกที่ต้องการการทำงานร่วมกันข้ามสายงานมากขึ้นเรื่อยๆ Connector คือสมบัติล้ำค่า',
      ],
      strengths: [
        'สื่อสารข้ามทีมได้ยอดเยี่ยม',
        'เก่งในการรวบรวมและกลั่นกรองความต้องการ',
        'เป็นพี่เลี้ยงและผู้สร้างวัฒนธรรมที่ดี',
        'ตัดสินใจโดยยึดผู้ใช้เป็นศูนย์กลาง',
        'สร้างความสามัคคีในทีมได้แข็งแกร่ง',
      ],
      weaknesses: [
        'อาจเลี่ยงงานเทคนิคเชิงลึกแบบเดี่ยว',
        'อาจลังเลภายใต้แรงกดดัน',
        'บางครั้งให้ความสำคัญกับฉันทามติมากเกินไป',
        'อาจขาดความเห็นทางเทคนิคที่หนักแน่น',
        'ช้ากว่าในงานที่ต้องโฟกัสลึกแบบโดดเดี่ยว',
      ],
      careers: ['Engineering Manager', 'Staff Engineer', 'Product-minded Engineer', 'Developer Relations'],
      workingStyle: 'ได้พลังจากการทำงานร่วมกัน การพูดคุยตัวต่อตัว พิธีกรรมของทีม และการมีปฏิสัมพันธ์กับลูกค้า เปล่งประกายในสภาพแวดล้อมข้ามสายงาน',
      collaborationTips: 'ดึงพวกเขาเข้ามาในการวางแผนตั้งแต่เนิ่นๆ ให้ค่าการมีส่วนร่วมด้านทักษะเชิงสังคม และให้พื้นที่ในการนำการสนทนา',
      famousRoles: ['CEO Microsoft', 'บิดาแห่งอินเทอร์เน็ต', 'COO Facebook', 'CEO YouTube'],
    },
  },
]

export function getTypeById(id: string): EngineerType | undefined {
  return engineerTypes.find(t => t.id === id)
}

// Returns a copy of the type with localized fields applied for the given language.
// English ('en') returns the type unchanged. Famous engineer names are kept; only roles translate.
export function localizeType(type: EngineerType, lang: 'en' | 'th'): EngineerType {
  if (lang !== 'th' || !type.th) return type
  const th = type.th
  return {
    ...type,
    name: th.name,
    tagline: th.tagline,
    traits: th.traits,
    quote: th.quote,
    quoteAuthor: th.quoteAuthor,
    intro: th.intro,
    strengths: th.strengths,
    weaknesses: th.weaknesses,
    careers: th.careers,
    workingStyle: th.workingStyle,
    collaborationTips: th.collaborationTips,
    famousEngineers: type.famousEngineers.map((eng, i) => ({
      name: eng.name,
      role: th.famousRoles[i] ?? eng.role,
    })),
  }
}
