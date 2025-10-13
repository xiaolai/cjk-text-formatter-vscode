# CJK Text Formatter - Formatting Rules

Complete reference of all built-in formatting rules with examples in Chinese, Japanese, and Korean.

## Table of Contents

1. [Ellipsis Normalization](#1-ellipsis-normalization)
2. [Dash Conversion](#2-dash-conversion)
3. [Em-dash Spacing](#3-em-dash-spacing)
4. [Quote Spacing](#4-quote-spacing)
5. [Single Quote Spacing](#5-single-quote-spacing)
6. [CJK-English Spacing](#6-cjk-english-spacing)
7. [Fullwidth Punctuation](#7-fullwidth-punctuation)
8. [Fullwidth Parentheses](#8-fullwidth-parentheses)
9. [Fullwidth Brackets](#9-fullwidth-brackets)
10. [Fullwidth Alphanumeric](#10-fullwidth-alphanumeric)
11. [Currency Spacing](#11-currency-spacing)
12. [Slash Spacing](#12-slash-spacing)
13. [Space Collapsing](#13-space-collapsing)

---

## 1. Ellipsis Normalization

**Config:** `cjkFormatter.rules.ellipsisNormalization`
**Default:** `true`

Converts spaced dots to standard ellipsis (`...`).

### Chinese (中文)
```text
Before: 这是一个例子. . .继续
After:  这是一个例子... 继续

Before: 内容省略. . . .更多
After:  内容省略... 更多
```

### Japanese (日本語)
```text
Before: これは例です. . .続く
After:  これは例です... 続く
```

### Korean (한국어)
```text
Before: 이것은 예입니다. . .계속
After:  이것은 예입니다... 계속
```

---

## 2. Dash Conversion

**Config:** `cjkFormatter.rules.dashConversion`
**Default:** `true`

Converts double dash (`--`) to em-dash (`——`) between CJK characters.

### Chinese (中文)
```text
Before: 这是前文--这是后文
After:  这是前文 —— 这是后文

Before: 北京--上海--广州
After:  北京 —— 上海 —— 广州
```

### Japanese (日本語)
```text
Before: 前の文--後の文
After:  前の文 —— 後の文

Before: 東京--大阪--京都
After:  東京 —— 大阪 —— 京都
```

### Korean (한국어)
```text
Before: 앞문장--뒷문장
After:  앞문장 —— 뒷문장

Before: 서울--부산--제주
After:  서울 —— 부산 —— 제주
```

---

## 3. Em-dash Spacing

**Config:** `cjkFormatter.rules.emdashSpacing`
**Default:** `true`

Fixes spacing around existing em-dash characters.

### Chinese (中文)
```text
Before: 这是前文——这是后文
After:  这是前文 —— 这是后文

Before: 内容（说明）——结论
After:  内容（说明）—— 结论
```

### Japanese (日本語)
```text
Before: 前の文——後の文
After:  前の文 —— 後の文

Before: 内容（説明）——結論
After:  内容（説明）—— 結論
```

### Korean (한국어)
```text
Before: 앞문장——뒷문장
After:  앞문장 —— 뒷문장
```

---

## 4. Quote Spacing

**Config:** `cjkFormatter.rules.quoteSpacing`
**Default:** `true`

Adds spaces around double quotes (`“ ”`) with smart CJK punctuation handling.

### Chinese (中文)
```text
Before: 这是“引用内容”的例子
After:  这是 “引用内容” 的例子

Before: 他说"你好"然后离开
After:  他说 "你好" 然后离开

Before: "开头引用"中间"结尾引用"
After:  "开头引用" 中间 "结尾引用"
```

### Japanese (日本語)
```text
Before: これは"引用内容"の例です
After:  これは "引用内容" の例です

Before: 彼は"こんにちは"と言った
After:  彼は "こんにちは" と言った
```

### Korean (한국어)
```text
Before: 이것은"인용내용"의예입니다
After:  이것은 "인용내용" 의 예입니다

Before: 그는"안녕하세요"라고말했다
After:  그는 "안녕하세요" 라고 말했다
```

**Special handling:**
- No space before closing punctuation: `他说 “你好”，然后离开`
- No space after opening punctuation: `（"引用"）`

---

## 5. Single Quote Spacing

**Config:** `cjkFormatter.rules.singleQuoteSpacing`
**Default:** `true`

Adds spaces around single quotes (`‘ ’`) with smart CJK punctuation handling.

### Chinese (中文)
```text
Before: 这是‘引用内容’的例子
After:  这是 ‘引用内容’ 的例子

Before: 他说‘你好’然后离开
After:  他说 ‘你好’ 然后离开
```

### Japanese (日本語)
```text
Before: これは'引用内容'の例です
After:  これは '引用内容' の例です
```

### Korean (한국어)
```text
Before: 이것은'인용내용'의예입니다
After:  이것은 '인용내용' 의 예입니다
```

---

## 6. CJK-English Spacing

**Config:** `cjkFormatter.rules.cjkEnglishSpacing`
**Default:** `true`

Adds spaces between CJK characters and English/numbers (including currency and units).

### Chinese (中文)
```text
Before: 这是中文English混合text
After:  这是中文 English 混合 text

Before: 价格100元，重量5kg
After:  价格 100 元，重量 5kg

Before: 温度25℃，比例50%
After:  温度 25℃，比例 50%

Before: $100美元或者¥100人民币
After:  $100 美元或者 ¥100 人民币
```

### Japanese (日本語)
```text
Before: これは日本語Englishの混合textです
After:  これは日本語 English の混合 text です

Before: 価格100円、重量5kg
After:  価格 100 円、重量 5kg

Before: 温度25°C、割合50%
After:  温度 25°C、割合 50%
```

### Korean (한국어)
```text
Before: 이것은한국어English혼합text입니다
After:  이것은 한국어 English 혼합 text 입니다

Before: 가격100원、무게5kg
After:  가격 100 원、무게 5kg

Before: 온도25도、비율50%
After:  온도 25 도、비율 50%
```

**Supported units:** `%`, `‰`, `℃`, `℉`, `°C`, `°F`
**Supported currencies:** `$`, `¥`, `€`, `£`, `₹`, `USD`, `CNY`, `EUR`, `GBP`, `RMB`

---

## 7. Fullwidth Punctuation

**Config:** `cjkFormatter.rules.fullwidthPunctuation`
**Default:** `true`

Normalizes punctuation to fullwidth in CJK context.

### Chinese (中文)
```text
Before: 你好,世界.这是测试!真的?可以;当然:是的
After:  你好，世界。这是测试！真的？可以；当然：是的

Before: 第一,第二,第三.
After:  第一，第二，第三。
```

### Japanese (日本語)
```text
Before: こんにちは,世界.テストです!本当?はい;もちろん:そうです
After:  こんにちは，世界。テストです！本当？はい；もちろん：そうです
```

### Korean (한국어)
```text
Before: 안녕하세요,세계.테스트입니다!정말?네;물론:그렇습니다
After:  안녕하세요，세계。테스트입니다！정말？네；물론：그렇습니다
```

**Conversions:**
- `,` → `，`
- `.` → `。`
- `!` → `！`
- `?` → `？`
- `;` → `；`
- `:` → `：`

**Note:** Only converts when surrounded by CJK characters (doesn't affect English text).

---

## 8. Fullwidth Parentheses

**Config:** `cjkFormatter.rules.fullwidthParentheses`
**Default:** `true`

Converts halfwidth parentheses to fullwidth in CJK context.

### Chinese (中文)
```text
Before: 这是中文(括号)内容
After:  这是中文（括号）内容

Before: 北京(首都)是中国的城市
After:  北京（首都）是中国的城市

Before: (注意)这很重要
After:  （注意）这很重要
```

### Japanese (日本語)
```text
Before: これは日本語(かっこ)の内容です
After:  これは日本語（かっこ）の内容です

Before: 東京(首都)は日本の都市です
After:  東京（首都）は日本の都市です
```

### Korean (한국어)
```text
Before: 이것은한국어(괄호)내용입니다
After:  이것은한국어（괄호）내용입니다

Before: 서울(수도)은한국의도시입니다
After:  서울（수도）은한국의도시입니다
```

**Note:** Only converts when the content starts with CJK characters. English text keeps halfwidth: `test (example) ok`

---

## 9. Fullwidth Brackets

**Config:** `cjkFormatter.rules.fullwidthBrackets`
**Default:** `false` (disabled by default)

Converts square brackets to fullwidth brackets in CJK context.

### Chinese (中文)
```text
Before: 这是中文[方括号]内容
After:  这是中文【方括号】内容

Before: [注释]这是说明
After:  【注释】这是说明
```

### Japanese (日本語)
```text
Before: これは日本語[かぎかっこ]の内容です
After:  これは日本語【かぎかっこ】の内容です
```

### Korean (한국어)
```text
Before: 이것은한국어[대괄호]내용입니다
After:  이것은한국어【대괄호】내용입니다
```

**Note:** Disabled by default because square brackets are commonly used in markdown links `[text](url)`.

---

## 10. Fullwidth Alphanumeric

**Config:** `cjkFormatter.rules.fullwidthAlphanumeric`
**Default:** `true`

Converts fullwidth alphanumeric characters to halfwidth.

### Chinese (中文)
```text
Before: 全角字符ＡＢＣ１２３
After:  全角字符 ABC123

Before: 数字０１２３４５６７８９
After:  数字 0123456789

Before: 字母ａｂｃＡＢＣ
After:  字母 abc ABC
```

### Japanese (日本語)
```text
Before: 全角文字ＡＢＣ１２３
After:  全角文字 ABC123

Before: 数字０１２３４５６７８９
After:  数字 0123456789
```

### Korean (한국어)
```text
Before: 전각문자ＡＢＣ１２３
After:  전각문자 ABC123

Before: 숫자０１２３４５６７８９
After:  숫자 0123456789
```

**Conversions:**
- `ＡＢＣ…Ｚ` → `ABC...Z`
- `ａｂｃ…ｚ` → `abc...z`
- `０１２３…９` → `0123...9`

---

## 11. Currency Spacing

**Config:** `cjkFormatter.rules.currencySpacing`
**Default:** `true`

Removes space between currency symbol and amount.

### Chinese (中文)
```text
Before: 价格是$ 100美元
After:  价格是$100美元

Before: 人民币¥ 500或者欧元€ 100
After:  人民币¥500或者欧元€100

Before: 总计USD 1000元
After:  总计USD1000元
```

### Japanese (日本語)
```text
Before: 価格は$ 100ドルです
After:  価格は$100ドルです

Before: 円¥ 500またはユーロ€ 100
After:  円¥500またはユーロ€100
```

### Korean (한국어)
```text
Before: 가격은$ 100달러입니다
After:  가격은$100달러입니다

Before: 원화¥ 500또는유로€ 100
After:  원화¥500또는유로€100
```

**Supported symbols:** `$`, `¥`, `€`, `£`, `₹`, `USD`, `CNY`, `EUR`, `GBP`, `RMB`

---

## 12. Slash Spacing

**Config:** `cjkFormatter.rules.slashSpacing`
**Default:** `true`

Removes spaces around slashes (except in URLs).

### Chinese (中文)
```text
Before: 比例是50 / 50
After:  比例是 50/50

Before: 日期2024 / 10 / 14
After:  日期 2024/10/14

Before: 选择A / B / C之一
After:  选择 A/B/C之一
```

### Japanese (日本語)
```text
Before: 比率は50 / 50です
After:  比率は 50/50です

Before: 日付2024 / 10 / 14
After:  日付 2024/10/14
```

### Korean (한국어)
```text
Before: 비율은50 / 50입니다
After:  비율은 50/50입니다

Before: 날짜2024 / 10 / 14
After:  날짜 2024/10/14
```

**Note:** URLs are preserved: `https://example.com/path` (not affected)

---

## 13. Space Collapsing

**Config:** `cjkFormatter.rules.spaceCollapsing`
**Default:** `true`

Collapses multiple consecutive spaces to single space, while preserving markdown list indentation.

### Chinese (中文)
```text
Before: 这是    多个    空格
After:  这是 多个 空格

Before: 文字  之间  有  空格
After:  文字 之间 有 空格
```

### Japanese (日本語)
```text
Before: これは    複数の    スペースです
After:  これは 複数の スペースです
```

### Korean (한국어)
```text
Before: 이것은    여러    공백입니다
After:  이것은 여러 공백입니다
```

### Markdown List Preservation
```markdown
Before:
- Item 1    with    spaces
  - Nested    item
    - Deep    nested

After:
- Item 1 with spaces
  - Nested item
    - Deep nested
```

**Note:** Preserves leading spaces for markdown list indentation (2, 4, 6 spaces, etc.).

---

## Rule Execution Order

Rules are applied in the following order:

1. Universal normalization (ellipsis)
2. Fullwidth conversions (alphanumeric → punctuation → parentheses → brackets)
3. Em-dash rules (conversion → spacing)
4. Quote spacing (double → single)
5. CJK-English spacing
6. Spacing cleanup (currency → slash → space collapsing)
7. Custom rules (user-defined, applied last)

---

## Configuration Example

Enable/disable all rules in `settings.json`:

```json
{
  "cjkFormatter.rules.ellipsisNormalization": true,
  "cjkFormatter.rules.dashConversion": true,
  "cjkFormatter.rules.emdashSpacing": true,
  "cjkFormatter.rules.quoteSpacing": true,
  "cjkFormatter.rules.singleQuoteSpacing": true,
  "cjkFormatter.rules.cjkEnglishSpacing": true,
  "cjkFormatter.rules.fullwidthPunctuation": true,
  "cjkFormatter.rules.fullwidthParentheses": true,
  "cjkFormatter.rules.fullwidthBrackets": false,
  "cjkFormatter.rules.fullwidthAlphanumeric": true,
  "cjkFormatter.rules.currencySpacing": true,
  "cjkFormatter.rules.slashSpacing": true,
  "cjkFormatter.rules.spaceCollapsing": true
}
```

---

## See Also

- [README.md](README.md) - Main documentation
- [Custom Rules Guide](.vscode/settings.json) - Example custom rules with IntelliSense
- [Testing Guide](testing/TESTING.md) - Test files and examples
