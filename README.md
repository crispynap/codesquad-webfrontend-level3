## 마스터즈코스 웹프론트엔드 level 3 : 할일 관리 프로그램

### 실행 방법
* git clone 후 해당 폴더에서 "npm start" 실행


### 수행 과정 정리

#### 요구사항 정리
* 명령어: add / update / show /  
* 상태: todo / doing / done

#### 요구사항에 대한 의문
* 완료할 때까지의 누적 시간은 어떻게 계산되는가
    * “update$n$doing” 명령 실행 시 시작시간을 task.startTime에 등록하고
    * “update$n$done” 명령 실행 시 현재시간-시작시간을 task.elapsedTime에 등록하고
    * “show$done” 명령 실행 시 시, 분(초에서 반올림) 단위로 출력하도록 한다

#### 체크 리스트
* 객체리터럴 의미 알아보기
* 입력을 잘못했을 경우 대비하기
    * 한글 입력, @ 등 다른 특수기호 입력 등으로 형식이 잘못되었을 경우(정규표현식 사용?)
    * done인 task를 update하는 경우
* 소요시간 출력할 때, 분이 0으로 맞아떨어질 경우 시간만 출력한다

#### 객체 설계
* task.id
* task.name
* task.state
* task.startTime
* task.add()
* task.show()
* task.update()

* tasks.show(how)

