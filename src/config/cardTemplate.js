import cardUdon from '../img/card_template/udon.png'
import cardUbon from '../img/card_template/ubon.jpg'
import cardSaat from '../img/card_template/SAAT.png'

export default [
  {
    name: 'ส.บ.ม.ท.',
    src: cardSaat,
    captureSize: { width: 115, height: (115 / 3) * 4 },
    capturePosition: { x: 12, y: 67 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
  {
    name: 'โรงเรียนอุบล',
    src: cardUbon,
    captureSize: { width: 98, height: (98 / 3) * 4 },
    capturePosition: { x: 15, y: 83 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
  {
    name: 'โรงเรียนอุดร',
    src: cardUdon,
    captureSize: { width: 90, height: 120 },
    capturePosition: { x: 17, y: 86 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
]
