/***  index html 변경 최소화를 위한 js 파일
 *  html의 한글 변경은 최대한 여기서 하기
*/

// 제목
const LABEL_TEXT_MAPPING = {
    "Type": "타입",
    "Tera Type": "테라 타입",
    "Forme": "폼",
    "Gender": "성별",
    "Level": "레벨",
    "Weight (kg)": "무게",
    "Nature": "성격",
    "Ability": "특성",
    "Item": "아이템",
    "Status": "상태이상",
    "Current HP": "현재 체력",
};

// 테이블 내용
const TH_TEXT_MAPPING = {
    "Base": "종족값",
    "IVs": "개체값",
    "EVs": "노력치",
    "Hp" : "체력",
    "Attack" : "공격",
    "Defense" : "방어",
    "Sp. Atk" : "특수공격",
    "Sp. Def" : "특수방어",
    "Speed" : "스피드",
};

// 성격
const NATURE_OPTION_MAPPING = {
    "Adamant": "고집 (+공격, -특공)",
    "Bashful": "수줍음",
    "Bold": "대담 (+방어, -공격)",
    "Brave": "용감 (+공격, -스피드)",
    "Calm": "차분 (+특방, -공격)",
    "Careful": "신중 (+특방, -특공)",
    "Docile": "온순",
    "Gentle": "얌전 (+특방, -방어)",
    "Hardy": "노력",
    "Hasty": "성급 (+스피드, -방어)",
    "Impish": "장난꾸러기 (+방어, -특공)",
    "Jolly": "명랑 (+스피드, -특공)",
    "Lax": "촐랑 (+방어, -특방)",
    "Lonely": "외로움 (+공격, -방어)",
    "Mild": "의젓 (+특공, -방어)",
    "Modest": "조심 (+특공, -공격)",
    "Naive": "천진난만 (+스피드, -특방)",
    "Naughty": "개구쟁이 (+공격, -특방)",
    "Quiet": "냉정 (+특공, -스피드)",
    "Quirky": "변덕",
    "Rash": "덜렁 (+특공, -특방)",
    "Relaxed": "무사태평 (+방어, -스피드)",
    "Sassy": "건방 (+특방, -스피드)",
    "Serious": "성실",
    "Timid": "겁쟁이 (+스피드, -공격)",
};

//  동료 쓰러짐
const ALLIES_FAINTED_OPTION_MAPPING = {
    "0": "아무도 안 쓰러짐",
    "1": "한 마리 쓰러짐",
    "2": "두 마리 쓰러짐",
    "3": "세 마리 쓰러짐",
    "4": "네 마리 쓰러짐",
    "5": "다섯 마리 쓰러짐",
};

//  부스트 특성
const BOOSTED_STAT_OPTION_MAPPING = {
    "auto": "자동",
    "": "비활성",
    "atk": "공격",
    "def": "방어",
    "spa": "특수공격",
    "spd": "특수방어",
    "spe": "스피드",
};

//  상태이상
const STATUS_OPTION_MAPPING = {
    "Healthy": "없음",
    "Poisoned": "독",
    "Badly Poisoned": "맹동",
    "Burned": "화상",
    "Paralyzed": "마비",
    "Asleep": "잠듦",
    "Frozen": "얼음",
};

//  연타
const MOVE_HITS_MAPPING = {
    "2": "2 연타",
    "3": "3 연타",
    "4": "4 연타",
    "5": "5 연타",
};

// 기술사용횟수
const STAT_DROPS_MAPPING = {
    "1": "1번 사용",
    "2": "2번 사용",
    "3": "3번 사용",
    "4": "4번 사용",
    "5": "5번 사용",
};

// 메트로늄 사용횟수
const METRONOMES_MAPPING = {
    "0": "0번 사용",
    "1": "1번 사용",
    "2": "2번 사용",
    "3": "3번 사용",
    "4": "4번 사용",
    "5": "5번 사용",
};
 
$(document).ready(function(){
//  상위 메뉴
    document.getElementsByClassName("genSelection").item(0).title ='세대(포켓몬 버전)를 선택할 수 있습니다.';
    document.getElementsByClassName("notationSelection").item(0).title ='계산결과 표시형식을 선택할 수 있습니다.';
    document.getElementsByClassName("modeSelection").item(0).title ='계산모드를 선택할 수 있습니다.';
    document.getElementsByClassName("move-result-group").item(0).title ='기술을 클릭하면 결과가 계산됩니다.';
//  포켓몬 란
    document.querySelector("#p1 legend").innerText = '포켓몬 1';
    document.querySelector("#p2 legend").innerText = '포켓몬 2';

    // 나무위키 버튼
    var namuLink = document.createElement("small");
    namuLink.classList.add("right");
    var anchor = document.createElement("a");
    anchor.classList.add("namuSearch");
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("href", "");
    anchor.innerText = "(나무위키에서 검색)";
    namuLink.appendChild(anchor);

    // 모든 info-group top 클래스를 가진 요소를 선택
    var infoGroupTops = document.querySelectorAll(".info-group.top");
    // 각각의 요소에 namuLink를 추가
    infoGroupTops.forEach(function(infoGroupTop) {
        var firstDiv = infoGroupTop.querySelector("div");
        firstDiv.appendChild(namuLink.cloneNode(true)); // cloneNode로 복제하여 추가
    });

    // 임포트 보기
    const importedSetsText = document.querySelector("#p1 #importedSetsOptions");
    importedSetsText.childNodes[2].nodeValue = ' import한 것들만 보기';
    document.querySelector("#p1 #clearSets").innerText = 'import 세트 비우기';
    const importedSetsText2 = document.querySelector("#p2 #importedSetsOptions");
    importedSetsText2.childNodes[2].nodeValue = ' import한 것들만 보기';
    document.querySelector("#p2 #clearSets").innerText = 'import 세트 비우기';

    // 포켓몬 란 
    updateElementsText(LABEL_TEXT_MAPPING, ".info-group label");
    updateElementsText(TH_TEXT_MAPPING, ".info-group th");
    updateElementsText(NATURE_OPTION_MAPPING, ".nature option");
    updateOptionsText(ALLIES_FAINTED_OPTION_MAPPING, ".alliesFainted option");
    updateOptionsText(BOOSTED_STAT_OPTION_MAPPING, ".boostedStat option");
    updateOptionsText(STATUS_OPTION_MAPPING, "#statusL1 option");

    document.querySelector('.info-group.gen-specific.g9 .left label').innerText = "소금절이";

    // 각 move1과 move2의 select 요소들의 텍스트 변경
    var moveCats = document.querySelectorAll('.move-cat option');
    moveCats.forEach(function(option) {
        switch (option.value) {
            case "Physical":
                option.innerText = "물리";
                break;
            case "Special":
                option.innerText = "특수";
                break;
        }
    });

    var critBtns = document.querySelectorAll('.crit-btn');
    critBtns.forEach(function(label) {
        label.innerText = "크리";
        label.title = "크리티컬 공격으로 만들기";
    });

    var stellarBtns = document.querySelectorAll('.stellar-btn');
    stellarBtns.forEach(function(label) {
        label.innerText = "스텔라";
        label.title = "스텔라 공격으로 만들기";
    });

    updateOptionsText(MOVE_HITS_MAPPING, '.move-hits option');
    updateOptionsText(STAT_DROPS_MAPPING, '.stat-drops option');
    updateOptionsText(METRONOMES_MAPPING, '.metronome option');

//  포켓몬 끝

//  필드 란
    // 필드
    document.querySelector(".field-info legend").innerText = '필드';

    // 게임방식
    updateElementTextAndTitle('#selectBattleFormatInstruction', '배틀 형식을 선택할 수 있습니다.', {
        '#singles-format': '싱글',
        '#doubles-format': '더블'
    });

    // Default Level
    updateElementTextAndTitle('#selectDefaultLevelInstruction', '레벨을 선택할 수 있습니다.', {
        '#default-level-100': '레벨 100',
        '#default-level-50': '레벨 50',
        '#default-level-5': '레벨 5'
    });

    // Terrain
    updateElementTextAndTitle('#selectTerrainInstruction', '필드 효과를 선택할 수 있습니다.', {
        '#electric': '일렉트릭 필드',
        '#grassy': '그래스 필드',
        '#misty': '미스티 필드',
        '#psychic': '사이코 필드'
    });

    // Ruin abilities
    updateElementTextAndTitle('#selectRuinInstruction', '필드 재앙 효과를 선택할 수 있습니다.', {
        '#beads': '재앙의 구슬',
        '#tablets': '재앙의 목간',
        '#sword': '재앙의 검',
        '#vessel': '재앙의 그릇'
    });
    // 날씨 옵션을 한글로 변경
    document.querySelector('#selectGscWeatherInstruction').parentElement.title = '필드 날씨를 선택할 수 있습니다.';
    document.querySelector('#harsh-sunshine').parentElement.title = '필드 날씨를 선택할 수 있습니다.';
    document.querySelector('#selectWeatherInstruction').parentElement.title = '필드 날씨를 선택할 수 있습니다.';
    document.querySelector('#selectWeatherInstruction').nextElementSibling.title = '필드 날씨를 선택할 수 있습니다.';
    document.querySelector('#clear').nextElementSibling.textContent = '없음';
    document.querySelector('#sun').nextElementSibling.textContent = '쾌청';
    document.querySelector('#rain').nextElementSibling.textContent = '비';
    document.querySelector('#sand').nextElementSibling.textContent = '모래바람';
    document.querySelector('#hail').nextElementSibling.textContent = '우박';
    document.querySelector('#snow').nextElementSibling.textContent = '눈';
    document.querySelector('#harsh-sunshine').nextElementSibling.textContent = '큰가뭄';
    document.querySelector('#heavy-rain').nextElementSibling.textContent = '폭우';
    document.querySelector('#strong-winds').nextElementSibling.textContent = '난기류';
    document.querySelector('#gscClear').nextElementSibling.textContent = '없음';
    document.querySelector('#gscSun').nextElementSibling.textContent = '쾌청';
    document.querySelector('#gscRain').nextElementSibling.textContent = '비';
    document.querySelector('#gscSand').nextElementSibling.textContent = '모래바람';

    // Magic Room 및 Wonder Room을 한글로 변경
    document.querySelector('#gravityInstruction').parentElement.title = '필드에 중력이 발동되어있는지 선택하세요.';
    document.querySelector('label[for="magicroom"]').textContent = '매직룸';
    document.querySelector('label[for="wonderroom"]').textContent = '원더룸';
    document.querySelector('label[for="gravity"]').textContent = '중력';

    // 스텔스락
    updateElementTextAndTitle('#selectStealthRockInstruction', '스텔스락이 이 쪽 필드에 영향을 주고 있습니까?', {
        '#srL': '스텔스락',
        '#srR': '스텔스락'
    });

    // 거다이강철진
    updateElementTextAndTitle('#selectSteelsurgeInstruction', '거다이강철진이 이 쪽 필드에 영향을 주고 있습니까?', {
        '#steelsurgeL': '거다이강철진',
        '#steelsurgeR': '거다이강철진'
    });

    // 거다이편달 및 거다이옥염
    document.querySelector('label[for="vinelashL"]').parentElement.title = '거다이편달 또는 거다이옥염이 이 쪽 필드에 영향을 주고 있습니까?';
    document.querySelector('label[for="vinelashR"]').parentElement.title = '거다이편달 또는 거다이옥염이 이 쪽 필드에 영향을 주고 있습니까?';
    document.querySelector('label[for="vinelashL"]').innerText = '거다이편달';
    document.querySelector('label[for="wildfireL"]').innerText = '거다이옥염';
    document.querySelector('label[for="wildfireR"]').innerText = '거다이옥염';
    document.querySelector('label[for="vinelashR"]').innerText = '거다이편달';
    // 거다이분석 또는 거다이포격
    document.querySelector('label[for="volcalithL"]').parentElement.title = '거다이분석 또는 거다이포격 이 쪽 필드에 영향을 주고 있습니까?';
    document.querySelector('label[for="volcalithR"]').parentElement.title = '거다이분석 또는 거다이포격 이 쪽 필드에 영향을 주고 있습니까?';
    document.querySelector('label[for="volcalithL"]').innerText = '거다이분석';
    document.querySelector('label[for="cannonadeL"]').innerText = '거다이포격';
    document.querySelector('label[for="cannonadeR"]').innerText = '거다이포격';
    document.querySelector('label[for="volcalithR"]').innerText = '거다이분석';
    // 압정
    document.querySelector('label[for="spikesL3"]').parentElement.title = '이쪽 플레이어 바닥에 압정이 깔려 있습니까?';
    document.querySelector('label[for="spikesR3"]').parentElement.title = '이쪽 플레이어 바닥에 압정이 깔려 있습니까?';
    document.querySelector('label[for="spikesL3"]').innerText = '3 압정';
    document.querySelector('label[for="spikesR3"]').innerText = '3 압정';
    
    // 빛의장막, 리플랙터
    updateElementTextAndTitleByLabel("lightScreen", '빛의장막', '이쪽 포켓몬을 빛의장막이나 리플렉터로 보호할 수 있습니다');
    updateElementTextAndTitleByLabel("reflect", '리플랙터', '이쪽 포켓몬을 빛의장막이나 리플렉터로 보호할 수 있습니다');
    
    // 방어
    updateElementTextAndTitleByLabel("protect", '방어', '이쪽 포켓몬을 방어로 보호할 수 있습니다');
    
    // 씨뿌리기
    updateElementTextAndTitleByLabel("leechSeed", '씨뿌리기', '이쪽 포켓몬이 씨뿌리기의 영향을 받고 있나요?');
    
    // 꿰뚫어보기
    updateElementTextAndTitleByLabel("foresight", '꿰뚫어보기', '이쪽 포켓몬이 냄새구별이나 꿰뚫어보기의 영향을 받고 있나요?');
    
    // 도우미
    updateElementTextAndTitleByLabel("helpingHand", '도우미', '이쪽 포켓몬이 도우미의 효과로 강화되었습니까?');
    
    // 순풍
    updateElementTextAndTitleByLabel("tailwind", '순풍', '이쪽 포켓몬이 순풍 효과로 강화되었습니까?');
  
    // 플라워기프트
    updateElementTextAndTitleByLabel("flowerGift", '플라워기프트', '이쪽 포켓몬이 같은 편의 플라워기프트 효과를 받고 있습니까?');

    // 프렌드가드
    updateElementTextAndTitleByLabel("friendGuard", '프렌드가드', '이쪽 포켓몬이 같은 편의 프렌드가드 효과를 받고 있습니까?');

    // 오로라베일
    updateElementTextAndTitleByLabel("auroraVeil", '오로라베일', '이쪽 포켓몬이 같은 편의 오로라베일 효과를 받고 있습니까?');

    // 올스탯
    updateElementTextAndTitleByLabel("StatBoost", '올 1랭업', '이쪽 포켓몬이 같은 편의 올 1랭업 효과를 받고 있습니까?');

    // 배터리
    updateElementTextAndTitleByLabel("battery", '배터리', '이쪽 포켓몬이 같은 편의 배터리 효과를 받고 있습니까?');
    
    // 파워스폿
    updateElementTextAndTitleByLabel("powerSpot", '파워스폿', '이쪽 포켓몬이 같은 편의 파워스폿 효과를 받고 있습니까?');

    // 파워스폿
    updateElementTextAndTitleByLabel("switching", '교체', '방어 포켓몬이 교체아웃합니까?');

    document.querySelector(`#exportL`).parentElement.title = '왼쪽 포켓몬 샘플을 밑 상자로 내보냅니다.';
    document.querySelector(`#exportR`).parentElement.title = '오른쪽 포켓몬 샘플을 밑 상자로 내보냅니다.';
//  /필드 끝 
});

function updateElementsText(mapping, selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        const text = mapping[element.innerText.trim()];
        if (text) {
            element.innerText = text;
        }
    });
}

function updateOptionsText(mapping, selector) {
    const options = document.querySelectorAll(selector);
    options.forEach(function (option) {
        const text = mapping[option.value];
        if (text) {
            option.innerText = text;
        }
    });
}

function updateElementTextAndTitle(selector, title, elements) {
    const parentElement = document.querySelector(selector)?.parentElement;
    parentElement.title = title;
    for (const [id, text] of Object.entries(elements)) {
        const element = parentElement.querySelector(id);
        if (element) {
            element.nextElementSibling.textContent = text;
        }
    }
}

function updateElementTextAndTitleByLabel(selector, text, title) {
    const elementL = document.querySelector(`label[for="${selector}L"]`);
    const elementR = document.querySelector(`label[for="${selector}R"]`);
    elementL.parentElement.title = title;
    elementL.innerText = text;
    elementR.parentElement.title = title;
    elementR.innerText = text;

}

function updateElementText(selector, text) {
    const label = document.querySelector(`label[for="${selector}"]`);
    if (label) {
        label.innerText = text;
    }
}