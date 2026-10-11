# 44~47회 공개 출제 주제 조사와 독립 문항 집필

확인일: 2026-10-11. `dist/rounds-44-47.js`에는 각 회차 30문항(1·2·3과목 6·6·18), 총 120문항을 수록했다. ID는 `r44-01`~`r47-30`이며 각 문항에 주제 출처를 연결했다.

이 문항들은 공개된 응시 기억·시험 분석에서 **확인한 주제**를 바탕으로 새 사례, 수치, 선택지와 해설을 독립적으로 작성한 연습문항이다. 원 시험지의 문장·전체 50문항·선택지·그림·정답 순서의 복원이 아니다. 공식 기출이나 공식 정답을 확보했다는 의미도 아니다. 따라서 `sourceCoverage`는 `public-topics`로 기록했다.

## 공개 주제 근거

데이터에듀가 직접 게시한 분석을 사용했다. 모두 “복원 과정에서 부정확하거나 수정될 수 있다”는 취지의 안내를 포함한다. 본문에 불완전한 표·그림이나 기억의 이견이 있어 해당 사례는 그대로 이용하지 않았다.

| 회차 | 과목·게시일 | 주제 확인 출처 | 확인한 주요 주제 |
| --- | --- | --- | --- |
| 44 | 1과목 · 2025-02-26 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?idx=154&cate=review) | DB의 이용 관점, 데이터 용량, HTML, 연관분석, 회귀 활용, 분석가의 전략적 통찰 |
| 44 | 2과목 · 2025-02-26 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=155) | 분석 절차, 거버넌스, 가치 측정, 우선순위, 정합성, 성숙도, 상향식 접근 |
| 44 | 3과목 · 2025-02-26 | [분석 1](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=156), [분석 2](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=157) | 순위 상관, 계통추출, K-NN, 비모수 검정, 중심극한정리, 시계열, 공선성, 거리, 조건부 확률, PCA, K-means, 부트스트랩, Apriori, 로지스틱, 회귀 해석, 불순도, 연관규칙 |
| 45 | 1과목 · 2025-05-19 | [공개 분석](https://dataedupt.kr/sub/community/bbs1view1.php?idx=189) | DIKW, DB 특성·무결성, 유전자 알고리즘, 비식별화 기법, 데이터 활용 가치 |
| 45 | 2과목 · 2025-05-19 | [공개 분석](https://dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=190) | 기획 유형, 상향식 접근, 거버넌스, 준비도·성숙도, 전략적 필요성, 성능·복잡도 균형 |
| 45 | 3과목 · 2025-05-19 | [공개 분석](https://dataedupt.kr/sub/community/bbs1view1.php?idx=191) | 척도, 범주형 검정, 결측, 차분, 회귀·변수선택, PCA, 상관, 인과 구분, 정밀도, ROC, 앙상블, 가지치기, K-means, SOM, 덴드로그램, 연관규칙, MDS |
| 46 | 1과목 · 2025-08-12 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=258) | DIKW, 정성·정량 데이터, DB, OLTP·OLAP, ETL, 분류 활용 |
| 46 | 2과목 · 2025-08-12 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?idx=259&cate=review) | 최적화 유형, CRISP-DM, 과제 정의서, 정확성·정밀성, 상향식 접근, 우선순위 |
| 46 | 3과목 · 2025-08-12 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=260) | 결측, 검정, 모수·통계량, 기댓값, R², t 검정, IQR, 공분산, PCA, 마이닝 절차, 정상성, 로지스틱, 분류, 신경망 연결·활성화, 재현율, 군집 연결 |
| 47 | 1과목 · 2025-11-05 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?idx=319&cate=review) | SECI, DIKW, DB 축적·전달, 익명화, OLTP, 데이터 사이언티스트 역량 |
| 47 | 2과목 · 2025-11-05 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?idx=320) | 기획, 데이터 형태, 솔루션 유형, 마스터플랜, 집중형 조직, 거버넌스 |
| 47 | 3과목 · 2025-11-05 | [공개 분석](https://www.dataedupt.kr/sub/community/bbs1view1.php?cate=review&idx=321) | 척도, EDA, 상자그림, 검정 오류, 비표본오차, 대표값, 순위 상관, p값, 회귀·공선성, ARIMA·정상성, Softmax·Sigmoid, 민감도, EM, Ward |

웹 도구에서 일부 URL이 403을 반환했지만 `cate=review` 추가 또는 쿼리 매개변수 순서 변경으로 위 13개 본문을 모두 확인했다. 검색 요약만으로 문항을 집필하지 않았다. 제3자의 유료 문항 모음이나 재게시된 원문은 수집하지 않았다.

## 회차 날짜

메타데이터의 `date`는 시험일이며 분석 게시일과 구별한다. 44회 2025-02-22, 45회 2025-05-17, 46회 2025-08-09, 47회 2025-11-02를 [시나공의 2025년 자격증 시행 일정표](https://www.sinagong.co.kr/file/download?file_name=%5B%E1%84%89%E1%85%B5%E1%84%82%E1%85%A1%E1%84%80%E1%85%A9%E1%86%BC%5D+2025%E1%84%82%E1%85%A7%E1%86%AB+%E1%84%8C%E1%85%A1%E1%84%80%E1%85%A7%E1%86%A8%E1%84%8C%E1%85%B3%E1%86%BC+%E1%84%89%E1%85%B5%E1%84%92%E1%85%A2%E1%86%BC+%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC.pdf&path=sinagong%252Fnotices%252F2025%252F01%252FyY34LhDZ3nR7YzVb3W5UyqHCkiFy99l9CojjUA1S.pdf)에서 확인했다. 일정 원 기관은 한국데이터산업진흥원이며 이 표는 출판사가 공개한 일정 자료다. 현재 DataQ 페이지에서 2025년 원 공고는 별도로 확보하지 못했다.

## 정답 독립 검토

원자료의 정답을 신뢰해 전사하지 않았다. 특히 다음 모호함을 피했다.

- 44회: 용량 계산은 SI(10진)와 IEC(2진)를 명확히 구분했다. 부트스트랩에서 특정 관측이 한 번도 선택되지 않을 확률은 `(1−1/n)^n`으로 직접 계산했다. 불완전한 회귀 출력·그림은 재사용하지 않았다.
- 45회: PCA 관련 불완전한 출력과 실제 출제 여부에 이견이 있는 표본추출 사례는 채택하지 않았다. MDS의 상대적 거리 보존, 가지치기의 일반화 목적을 명시했다.
- 46회: 자료의 OLTP·OLAP 혼동을 답습하지 않았다. DIKW에서 일반화와 행동 판단을 구분했고 유한 입력 시그모이드의 범위는 열린 구간 `(0,1)`로 설명했다. 측정의 정확성·정밀성과 분류 지표 precision을 구분했다.
- 47회: 스피어만을 임의의 모든 비선형 관계 지표로 설명하지 않았다. 상자그림의 이상치 경계와 실제 수염 끝을 구별했다. 불완전한 거래표와 원 회귀 출력을 이용하지 않았다.

독립 작성된 수치 사례 19개를 별도 계산으로 확인했다. 구조 검사에서 각 회차 30개, 과목별 6·6·18개, 고유 ID·문장 120개, 선택지 4개, 유효한 출처, 해설 존재를 확인했다. 원 시험지의 모든 주제를 망라했다는 의미는 아니다.

## 개념 검증에 사용한 1차 기술 자료

- [BIPM SI 접두어](https://www.bipm.org/en/measurement-units/si-prefixes): zetta·exa의 10진 배수.
- [R의 공분산·상관 공식 문서](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/cor.html): 표본 공분산의 분모, 순위 기반 상관.
- [R의 PCA 공식 문서](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/prcomp.html), [scikit-learn PCA](https://scikit-learn.org/stable/modules/decomposition.html#pca): 중심화·스케일·성분과 분산.
- [scikit-learn K-NN](https://scikit-learn.org/stable/modules/neighbors.html): 이웃 수·잡음·경계의 관계.
- [scikit-learn 군집](https://scikit-learn.org/stable/modules/clustering.html): K-means·계층 군집·Ward의 기준.
- [scikit-learn 평가 지표](https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics): 정밀도·재현율·ROC.
- [scikit-learn 혼합모형](https://scikit-learn.org/stable/modules/mixture.html): EM의 성분별 소속 확률과 모수 갱신.
- [scikit-learn 선형모형](https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification): 릿지와 공선성 대응.
- [scikit-learn 신경망](https://scikit-learn.org/stable/modules/neural_networks_supervised.html): 출력 활성화와 분류.
- [Forecasting: Principles and Practice, 정상성과 차분](https://otexts.com/fpp3/stationarity.html): 정상성·차분·시계열 구조.

위 자료는 개념의 검증 근거이며 해당 개념이 어느 회차에서 출제됐는지의 근거로 사용하지 않았다. 회차 연결은 앞 표의 공개 시험 분석에 한정했다.
