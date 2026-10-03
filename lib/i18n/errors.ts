import type { Translator } from './dictionaries'

export const errorsEn = {
  'error.number': 'Enter a number.',
  'error.length': 'Use at most {count} characters.',
  'error.slashes': '“{value}” has more than one “/”. Write a single fraction such as 2/3.',
  'error.invalid': '“{value}” is not a number. Use an integer, decimal, or fraction such as -3, 0.25, or 1/3.',
  'error.denominator': 'The denominator cannot be 0.',
  'error.clipboard': 'The clipboard is empty.',
  'error.noRows': 'No rows were found in the pasted text.',
  'error.ragged': 'Row {row} has {entries} entries but row 1 has {width}. Every row needs the same number of entries.',
  'error.operation': 'Write an operation such as R2 ← R2 − 3R1.',
  'error.arrowEquals': 'Use exactly one arrow or equals sign.',
  'error.arrow': 'Use exactly one arrow.',
  'error.arrowSides': 'Put the row being replaced on one side of the arrow and its new value on the other.',
  'error.includeArrow': 'Include an arrow, for example R2 ← R2 − 3R1, or ↔ to swap rows.',
  'error.singleRow': 'The row being replaced must be a single row, such as R2.',
  'error.readOperation': 'Could not read the right-hand side. Write terms like 3R1, (1/2)R2 or R2/4.',
  'error.twoRows': 'Use one elementary operation at a time: involve at most two rows.',
  'error.overwrite': 'That would overwrite R{row} without keeping it, which can lose an equation. Keep R{row} on the right-hand side.',
  'error.unchanged': 'R{row} ← R{row} leaves the matrix unchanged.',
  'error.combined': 'That combines scaling and replacement in one step. Scale the row first, then add the multiple as a second operation.',
  'error.rowsRange': 'Choose rows between 1 and {rows}.',
  'error.rowRange': 'Choose a row between 1 and {rows}.',
  'error.sameSwap': 'Swapping a row with itself does nothing. Pick two different rows.',
  'error.zeroScale': 'Multiplying a row by 0 erases an equation, so it is not allowed. Use a nonzero factor.',
  'error.sameReplace': 'Add a multiple of a different row. Adding a row to itself is really a scaling.',
  'error.zeroReplace': 'Adding 0 times a row changes nothing. Use a nonzero multiple.',
} as const
export const errorsAr = {
  'error.number': 'أدخل عددًا.',
  'error.length': 'استخدم {count} حرفًا كحد أقصى.',
  'error.slashes': 'تحتوي «{value}» على أكثر من علامة قسمة. اكتب كسرًا واحدًا مثل ⁦2/3⁩.',
  'error.invalid': '«{value}» ليست عددًا. استخدم عددًا صحيحًا أو عشريًا أو كسرًا مثل ⁦-3⁩ أو ⁦0.25⁩ أو ⁦1/3⁩.',
  'error.denominator': 'لا يمكن أن يكون المقام صفرًا.',
  'error.clipboard': 'الحافظة فارغة.',
  'error.noRows': 'لم يُعثر على صفوف في النص الملصق.',
  'error.ragged': 'يحتوي الصف {row} على {entries} من القيم، بينما يحتوي الصف الأول على {width}. يجب أن يتساوى عدد القيم في جميع الصفوف.',
  'error.operation': 'اكتب عملية مثل ⁦R2 ← R2 − 3R1⁩.',
  'error.arrowEquals': 'استخدم سهمًا واحدًا أو علامة مساواة واحدة فقط.',
  'error.arrow': 'استخدم سهمًا واحدًا فقط.',
  'error.arrowSides': 'ضع الصف المراد استبداله على أحد جانبي السهم وقيمته الجديدة على الجانب الآخر.',
  'error.includeArrow': 'أضف سهمًا، مثل ⁦R2 ← R2 − 3R1⁩، أو استخدم ⁦↔⁩ لتبديل الصفوف.',
  'error.singleRow': 'يجب أن يكون الصف المراد استبداله صفًا واحدًا مثل ⁦R2⁩.',
  'error.readOperation': 'تعذّرت قراءة الطرف الأيمن. اكتب حدودًا مثل ⁦3R1⁩ أو ⁦(1/2)R2⁩ أو ⁦R2/4⁩.',
  'error.twoRows': 'استخدم عملية أولية واحدة في كل خطوة، تشمل صفين على الأكثر.',
  'error.overwrite': 'ستستبدل هذه العملية الصف ⁦R{row}⁩ دون الإبقاء عليه، مما قد يؤدي إلى فقدان معادلة. أبقِ ⁦R{row}⁩ في الطرف الأيمن.',
  'error.unchanged': 'العملية ⁦R{row} ← R{row}⁩ لا تغيّر المصفوفة.',
  'error.combined': 'تجمع هذه الخطوة بين الضرب والاستبدال. اضرب الصف أولًا، ثم أضف المضاعف في خطوة ثانية.',
  'error.rowsRange': 'اختر صفوفًا بين 1 و{rows}.',
  'error.rowRange': 'اختر صفًا بين 1 و{rows}.',
  'error.sameSwap': 'تبديل الصف بنفسه لا يغيّر شيئًا. اختر صفين مختلفين.',
  'error.zeroScale': 'ضرب الصف في صفر يمحو معادلة، لذا لا يُسمح به. استخدم عاملًا غير صفري.',
  'error.sameReplace': 'أضف مضاعفًا لصف مختلف. إضافة الصف إلى نفسه تعادل ضربه بعامل.',
  'error.zeroReplace': 'إضافة صفر مضروبًا في صف لا تغيّر شيئًا. استخدم مضاعفًا غير صفري.',
} satisfies Record<keyof typeof errorsEn, string>

const fixed = Object.entries(errorsEn).filter(([, value]) => !value.includes('{')) as [keyof typeof errorsEn, string][]
const patterns: readonly [RegExp, keyof typeof errorsEn, readonly string[]][] = [
  [/^Use at most (\d+) characters\.$/, 'error.length', ['count']],
  [/^“(.*)” has more than one “\/”\. Write a single fraction such as 2\/3\.$/, 'error.slashes', ['value']],
  [/^“(.*)” is not a number\. Use an integer, decimal, or fraction such as -3, 0\.25, or 1\/3\.$/, 'error.invalid', ['value']],
  [/^Row (\d+) has (\d+) entries but row 1 has (\d+)\. Every row needs the same number of entries\.$/, 'error.ragged', ['row', 'entries', 'width']],
  [/^That would overwrite R(\d+) without keeping it, which can lose an equation\. Keep R\d+ on the right-hand side\.$/, 'error.overwrite', ['row']],
  [/^R(\d+) ← R\d+ leaves the matrix unchanged\.$/, 'error.unchanged', ['row']],
  [/^Choose rows between 1 and (\d+)\.$/, 'error.rowsRange', ['rows']],
  [/^Choose a row between 1 and (\d+)\.$/, 'error.rowRange', ['rows']],
]

/** Keep the engine's messages stable; only localize known validation messages at the UI boundary. */
export function translateError(message: string, t: Translator): string {
  const entry = fixed.find(([, value]) => value === message)
  if (entry) return t(entry[0])
  for (const [pattern, key, names] of patterns) {
    const match = pattern.exec(message)
    if (match) return t(key, Object.fromEntries(names.map((name, i) => [name, match[i + 1]!])))
  }
  return message
}
