# 과목별 개념·암기 정리

작성·확인일: 2026-10-11 (Asia/Seoul). 파일: `dist/study-guide.js`.

이 자료는 핵심 개념을 빠르게 복습하는 독립 작성 요약이다. 교재·문항 원문·공식 해설을 전재하지 않았다. 암기 문구와 자가 확인 질문·수치는 자체 작성했으며 공식 암기법이나 전체 시험 범위의 완전한 대체 자료로 표시하지 않는다.

## 범위

| 과목 | 항목 수 | 주요 영역 |
|---|---:|---|
| 1 데이터 이해 | 12 | DIKW·SECI·데이터 구조·DB·DW·기업 시스템·빅데이터·가치·위험·역량·활용 |
| 2 데이터분석 기획 | 12 | 기획 유형·하향/상향·방법론·프로젝트·우선순위·로드맵·조직·진단·거버넌스 |
| 3 데이터분석 | 24 | R·결측/이상값·척도·통계·추정/검정·회귀·ANOVA·시계열·분류·평가·군집·차원축소·연관규칙 |

[DataQ 공식 ADsP 검정과목](https://www.dataq.or.kr/www/sub/a_06.do)의 현재 과목명·주요항목·세부항목을 일반 공개 HTTP GET으로 읽었다(200 응답). 웹 검색 도구의 400 응답과 구분한다. ADP의 데이터 처리 기술·시각화를 ADsP 독립 과목으로 추가하지 않았다. 범위 구성의 참고이며 모든 세부 용어 정의가 이 페이지에서 검증됐다는 의미는 아니다.

## 개념 근거

각 항목의 `sourceKeys`로 참고 자료를 연결한다. 한국어 시험 용어·기획 유형은 기존 공개 분석 근거를 연결하고, 표준 통계·분석은 아래 일차 자료와 교차 검토한다. 교육업체 분석은 기억 기반 자료이므로 오류·과도한 단정은 그대로 옮기지 않는다.

- [IBM CRISP-DM](https://public.dhe.ibm.com/software/analytics/spss/documentation/modeler/18.0/en/ModelerCRISPDM.pdf): 사업에서 배포까지의 6단계, 모델링 내부 평가와 별도 평가 단계 구분.
- [R 공식 입문](https://cran.r-project.org/doc/manuals/r-release/R-intro.html), [t 검정](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/t.test.html), [ARIMA](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/arima.html): 자료 구조·연산·검정·시계열.
- [NIST 왜도·첨도](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm): 꼬리 방향, 정규분포의 첨도 3/초과첨도 0 구분.
- [scikit-learn 교차 검증](https://scikit-learn.org/stable/modules/cross_validation.html), [선형 모형](https://scikit-learn.org/stable/modules/linear_model.html), [나무](https://scikit-learn.org/stable/modules/tree.html): 누수 방지·규제·모형 선택.
- [평가 지표](https://scikit-learn.org/stable/modules/model_evaluation.html), [군집](https://scikit-learn.org/stable/modules/clustering.html), [PCA](https://scikit-learn.org/stable/modules/decomposition.html): 지표 분모·군집 기준·설명분산.
- [arules 저자의 지표 정의](https://mhahsler.github.io/arules/docs/measures): 지지도·신뢰도·향상도의 확률 표현.
- 공개 분석의 회차별 원 URL과 확인 한계는 [SOURCES.md](SOURCES.md), [40~43회](rounds-40-43.md), [44~47회](rounds-44-47.md)에 기록돼 있다.

## 오개념 방지

p값을 귀무가설의 확률로 해석하지 않는다. 기각하지 못함과 참임을 입증함을 구분한다. 상관·연관규칙과 인과를 구분하고, 큰 표본이 비표본 오차를 자동 해결하지 않는다고 명시한다. 표준화가 정규분포를 만드는 것이 아님을 적는다. 주성분의 무상관과 독립을 구분한다. 최소·최대 변환의 새 값이 0~1 밖에 나올 수 있음, DBSCAN의 서로 다른 밀도 한계, ReLU의 비활성 뉴런 가능성도 적는다.

DW의 비휘발성을 절대 갱신 불가로 설명하지 않는다. 조직 진단은 준비도·성숙도 축 순서를 고정하고, 단계 이름이 서로 다른 방법론을 섞지 않는다. 위험/통제의 세 가지 대응 연결은 시험 용어를 기억하는 틀로 표시하며 이 조치만으로 보호·공정성이 보장된다고 주장하지 않는다. 법률적 해석이나 개인정보 처리의 허용 여부를 안내하지 않는다.

## 자체 계산 확인

| 확인 사례 | 결과 |
|---|---|
| Q1=20, Q3=40의 상한 | IQR=20, 상한70 |
| 평균50·표준편차10에서 x=70 | z=2 |
| 2,4,6의 표본 분산 | 편차 제곱합8 / (3−1)=4 |
| 이항 n=5, p=0.4 | 평균2, 분산1.2 |
| ANOVA 평균제곱30 / 5 | F=6 |
| 두 점 (1,1), (4,5) | 유클리드5, 맨해튼7 |
| 클래스 비율 0.5,0.5 | 지니0.5 |
| TP12·FP3·FN6 | 정밀도0.8, 재현율2/3, F1=8/11 |
| 고유값4,3,1의 첫 두 축 | 누적87.5% |
| 100건·A40·B50·동시30 | 지지도0.3, 신뢰도0.75, 향상도1.5 |

스크립트는 구조·개수·출처 키·비교표의 열 수·PWA 캐시 포함을 검사한다. 브라우저에서는 과목·정리 방식·검색·빈 결과·단원·펼침·자가 확인·공식·문제풀이 연결과 모바일/데스크톱 배치를 확인한다. 자동 구조 검증이 교육적 정확성의 완전한 보증이라고 표현하지 않는다.
