# 요약노트 그림 제작 기록

제작일: 2026-10-12. 도구: Codex 내장 `image_gen.imagegen`. 모두 새로 생성한 학습용 그림이며 원본은 생성 폴더에 보존하고 앱 사본은 `dist/images/`에 저장했다. 기존 앱이나 책의 그림을 복제하지 않았다.

실제 그림의 짧은 문구 외 설명·시험 용어·대체 텍스트는 HTML로 제공한다. CRISP-DM은 요리 비유이며 단계 간 반복이 가능하다. 모형 적합도 그림은 개념 예시이며 일반화 성능은 검증 자료로 판단한다.

## dikw

앱 파일: `dist/images/dikw-story.png`

생성 프롬프트:

Use case: scientific-educational. Asset type: original concept illustration for a Korean mobile ADsP study note. Create one portrait editorial educational illustration, four large scenes stacked vertically with generous white space. Same small bakery owner throughout. Scene 1: loose receipts and individual order observations. Scene 2: receipts organized into a simple day-by-day bar chart. Scene 3: owner identifies a repeated busy-Friday pattern by connecting repeated chart peaks, thoughtful pose. Scene 4: owner makes an action decision by arranging extra staff behind the bakery counter. Mark scenes only with large numerals 1,2,3,4; absolutely no other letters, words, tiny pseudo-writing or mathematical claims. Explanations will be added as real HTML outside the image. Friendly clear ink-and-flat-color illustration, practical ELI5 imagery, accessible mobile scale, crisp navy line work, cream white background, blue/purple/amber/coral accents, no green or teal anywhere, no gradient, no watermark, no logo, no app UI. Images must illustrate observation -> context -> pattern understanding -> action, not imply correlation establishes causation.

+## crisp

앱 파일: `dist/images/crisp-recipe.png`

생성 프롬프트:

Use case: scientific-educational. Asset type: original concept illustration for Korean mobile ADsP CRISP-DM notes. Create a portrait six-scene illustrated recipe analogy arranged as three rows of two large scenes. Use large numerals 1 through 6, no other words or letters. 1 chef listens to a customer and chooses a meal goal; 2 chef examines ingredients and their condition; 3 chef washes cuts and prepares ingredients; 4 chef experiments with cooking a recipe; 5 chef and customer taste and check whether meal meets goal; 6 finished meal is served, chef checks a small service checklist. A simple clear arrow track connects scenes in order 1,2,3,4,5,6, with a subtle return arrow from 5 back toward 3 representing iteration. Warm editorial ink and flat color, same chef character, light ivory white background, navy and purple main colors, amber/coral accents. Absolutely no green/teal, gradients, watermark, logos, app mockup, unreadable microtext. Keep large purposeful objects and clean separation. This is a concrete everyday analogy, not a decorative collage. Actual CRISP-DM stage captions will be real HTML outside the bitmap.

+## fit

앱 파일: `dist/images/model-fit.png`

생성 프롬프트:

Use case: scientific-educational. Asset type: original educational graph illustration for mobile Korean ADsP overfitting notes. Create one portrait image with three wide plot panels stacked vertically. Each plot contains the exact same loose upward nonlinear trend of about 12 blue observation dots with visible noise. Panel 1 labeled only numeral 1: a flat straight orange line missing the curved trend, underfitting. Panel 2 labeled only numeral 2: a smooth moderate orange curve following the general trend while leaving residual noise, appropriate complexity. Panel 3 labeled only numeral 3: a wildly oscillating orange polynomial curve weaving through almost every dot, overfitting. Draw plain navy horizontal and vertical axes without numbers or words; no claim these are real measured data. Light ivory background, crisp clear educational editorial style, blue dots, burnt orange curves, purple numerals. No green/teal, no gradients, no people, no logos or watermark, no formulas or text other than 1 2 3. Each curve must stay inside its panel. External accessible HTML captions will explain training versus validation; do not depict a claim that fitting all training points predicts better.

+## confusion

앱 파일: `dist/images/confusion-matrix.png`

생성 프롬프트:

Use case: scientific-educational. Asset type: Korean mobile ADsP explanation of confusion matrix. Create a clean portrait educational infographic with a large 2 by 2 confusion matrix. Exact Korean labels: top left column "양성 예측", top right column "음성 예측"; left side top row "실제 양성", left side bottom row "실제 음성". Four cells in row-major order: "TP 12", "FN 6", "FP 3", "TN 79". Use large typography and minimal flat icons (check mark for correctly classified TP/TN, caution marks for FN/FP) with no small decorative text. Under matrix, two very clear separate fraction diagrams: "정밀도" with "12 / 15 = 80%"; "재현율" with "12 / 18 ≈ 66.7%". White or pale ivory background, crisp navy text, blue correct cells, muted coral error cells, purple and amber for the two denominators. Never use green or teal. No logo, gradient, watermark, extra headings, pseudo-writing, random numbers. All values and Korean text must be exact. This is a teaching example, no photographic people. Layout must remain understandable at about 300px display width.

+## CRISP-DM 색상 수정

초기 생성물의 초록 식재료를 아래 프롬프트로 수정했다. 최종 수정 이미지만 앱에 사용한다.

Edit this exact six-panel educational chef illustration. Keep the six scenes, character, objects, layout, numbers 1 through 6 and arrows unchanged. Remove EVERY green or teal leaf, herb and garnish in all panels. Replace them with ivory mushrooms, coral red peppers or orange carrots with brown stems. Do not add any green or teal anywhere. No other changes.
