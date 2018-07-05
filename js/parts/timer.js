function timer() {

	// Timer

	// Создаем заголовок для таймера
	createElements("timer1", "timer-header", false, true);

	// Внутри элемента с id "timer1" cоздаем блоки [дни, часы, минуты, секунды]

	["days", "hours", "minutes", "seconds"].forEach(function (id) {
	    createElements("timer1", id, false, true);

	    //Для каждого блока [дни, часы, минуты, секунды] создаем дочерние блоки с правой и левой цифрой
	    
	    ["left", "right"].forEach(function (child_id) {
	        createElements(id, child_id, true, true);
	    });

	    //Создаем подписи для значений
	    createElements(id, 'title-' + id, false, true);
	});

	// Задаем заголовок
	let header = document.getElementById('timer-header');
	header.innerHTML = "ДO ЗАВЕРШЕНИЯ АКЦИИ:";

	// Задаем подписи к значениям таймера
	let days = document.getElementById('title-days'),
		  hours = document.getElementById('title-hours'),
			minutes = document.getElementById('title-minutes'),
			seconds = document.getElementById('title-seconds');
	days.innerHTML = "дней";
	hours.innerHTML = "часов";
	minutes.innerHTML = "минут";
	seconds.innerHTML = "секунд";

	StartCountDown("timer1", "07/31/2018 00:00");

	function insertAfter(referenceNode, newNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	// ++ родительский элемент;
	// ++ идентификатор блока (берется из обрабатываемого массива);
	// ++ true - class="идентификатор блока"; false - id="идентификатор блока";
	// ++ true - СОЗДАТЬ ВНУТРИ родителя; false - ПРИКРЕПИТЬ ПОСЛЕ родителя
	function createElements(parent_id, id, create_class, create_child) {
	  create_class = typeof create_class !== 'undefined' ? !! create_class : false;
	  create_child = typeof create_child !== 'undefined' ? !! create_child : false;
	  let div = document.createElement('div'),
	  		parent = document.getElementById(parent_id);
	  if (create_class) {
	      div.className = id;
	  } else {
	      div.id = id;
	  }
	  if (create_child) {
	      parent.appendChild(div);
	  } else {
	      insertAfter(parent, div);
	  }
	}

	function StartCountDown(myDiv, myTargetDate) {
	  let dthen = new Date(myTargetDate),
	  		dnow = new Date();
	  ddiff = new Date(dthen - dnow);
	  gsecs = Math.floor(ddiff.valueOf() / 1000);
	  CountBack(myDiv, gsecs);
	}

	function Calcage(secs, num1, num2) {
	  s = ((Math.floor(secs / num1)) % num2).toString();
	  if (s.length < 2) {
	      s = "0" + s;
	  }
	  return (s);
	}

	function CountBack(myDiv, secs) {
	  let timeArr = [],
	      holder;
	  if (secs > 0) {
	    timeArr.days = Calcage(secs, 86400, 100000).split('');
	    timeArr.hours = Calcage(secs, 3600, 24).split('');
	    timeArr.minutes = Calcage(secs, 60, 60).split('');
	    timeArr.seconds = Calcage(secs, 1, 60).split('');

	    Object.keys(timeArr).map(function (key) {
	      holder = document.getElementById(key);
	      for (let i = 0; i < holder.childNodes.length; ++i) {
	        switch (holder.childNodes[i].className) {
	          case "left":
	            holder.childNodes[i].innerHTML = timeArr[key][0];
	            break;
	          case "right":
	            holder.childNodes[i].innerHTML = timeArr[key][1];
	            break;
	          default:
	            break;
	        }
	      }
	    });
	    setTimeout(function () {
	        CountBack(myDiv, secs - 1);
	    }, 990);
	  } else {
	      document.getElementById(myDiv).innerHTML = "АКЦИЯ ЗАВЕРШЕНА";
	  }
	}
}

module.exports = timer;