!function(){"use strict";!function(){class e{constructor(e,t,s,i){this.x=0,this.y=t,this.speed=s,this.canvas=i,this.loaded=!1,this.image=new Image;let n=this;this.image.addEventListener("load",(function(){n.loaded=!0})),this.image.src=e}updateDriveWay(e){this.y+=this.speed,this.y>this.canvas.height&&(this.y=e.y-this.canvas.width+this.speed)}}class t{constructor(e,t,s,i,n,a,o,l,d){this.x=t,this.y=s,this.speed=n,this.size=a,this.canvas=o,this.obstaclesSpeed=l,this.playerAcceleration=d,this.collideWith=!1,this.isRacer=i,this.loaded=!1,this.image=new Image;let c=this;this.image.addEventListener("load",(function(){c.loaded=!0})),this.image.src=e}updateMovingObject(){this.isRacer||(this.y+=this.speed+this.obstaclesSpeed),this.y>this.canvas.height+50&&(this.collideWith=!0)}hit(e){let t=!1;return this.y<e.y+e.image.height*this.size&&this.y+this.image.height*this.size>e.y&&this.x+this.image.width*this.size>e.x&&this.x<e.x+e.image.width*this.size&&(t=!0),t}move(e,t,s){"x"==e?(t*=s,this.x+=t,this.x+121+this.image.width*this.size>this.canvas.width&&(this.x-=t),this.x<132&&(this.x=132)):(t*=s,this.y+=t,this.y+this.image.height*this.size>this.canvas.height&&(this.y-=t),this.y<0&&(this.y=0))}}class s{constructor(e){this.src=e,this.sound=document.createElement("audio"),this.sound.src=e,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none",document.body.appendChild(this.sound)}play(){this.sound.play()}stop(){this.sound.pause()}}document.addEventListener("DOMContentLoaded",(()=>{let i;window.addEventListener("keydown",(function(e){!function(e){switch(e.keyCode){case 65:q.move("x",-4,_);break;case 68:q.move("x",4,_);break;case 87:q.move("y",-4,_);break;case 83:q.move("y",4,_);break;case 32:!function(){let e=document.getElementById("game-canvas");W>0?(S||j.play(),e.style="box-shadow: 0 0 50px rgb(225, 18, 18)",e.classList.add("shacky-canvas"),B=[],W--,L.innerHTML=`Rage ${W}`):(L.classList.add("rage-level-shake"),setTimeout((()=>{L.classList.remove("rage-level-shake")}),3e3)),setTimeout((()=>{e.classList.remove("shacky-canvas"),e.style="box-shadow: 0 0 24px rgb(21, 199, 223)"}),1500)}();break;case 72:S||j.play();break;case 38:_++;break;case 40:_--;break;case 27:null!=x?(G(),S||D.stop(),i=!1,I.style.display="block",O=document.createElement("p"),O.innerHTML="<br> <br> GAME PAUSED <br> <br> press ESC to CONTINUE",I.appendChild(O)):(P(),S||D.play(),O.remove(),I.style.display="none",i=!0,d())}}(e)}));let n=0,a=0,o=0,l=0;function d(){if(i){l++,100==l&&(o++,l=0),60==o&&(a++,o=0),60==a&&(n++,a=0,o=0);let e=n,t=a,s=o,i=l;n<10&&(e="0"+n),a<10&&(t="0"+t),o<10&&(s="0"+s),l<10&&(i="0"+i),document.getElementById("min").innerHTML=t,document.getElementById("sec").innerHTML=s,document.getElementById("count").innerHTML=i,setTimeout(d,10)}}const c=document.getElementById("game-canvas"),r=c.getContext("2d");c.width=626,c.height=626;let h=document.getElementById("play_game"),m=document.getElementById("resetGame"),u=document.getElementById("control_keys"),y=document.getElementById("control_keys_space"),g=document.getElementById("control_keys_pause"),p=document.getElementById("control_keys_honk"),b=document.getElementById("control_keys_acceleration"),v=document.getElementById("time"),w=document.querySelector(".game-counters"),k=document.getElementById("round-counter"),f=document.getElementById("life-counter"),L=document.getElementById("rage-level"),E=document.getElementById("cars-passed"),I=document.getElementById("collision-screen"),M=document.querySelector(".sound-control"),T=document.querySelector(".tooltip");h.addEventListener("click",(e=>{P(),h.classList.add("hide-controls"),T.style.display="none",m.style.display="block",v.style.display="block",u.style.display="block",y.style.display="block",g.style.display="block",p.style.display="block",b.style.display="block",w.style.display="block",i=!0,d()})),m.addEventListener("click",(e=>{window.location.reload()}));let x=null,$=.1,B=[],H=4,_=5,C=1;k.innerHTML=`Round ${C}`;let R=3;f.innerHTML=`Life ${R}`;let W=3;L.innerHTML=`Rage ${W}`;let z=0;E.innerHTML=`Passed cars ${z}`;let S=!1;M.addEventListener("click",(e=>{!1===S?(S=!0,M.src="../racing-game/assets/sound-off.png"):(S=!1,M.src="/assets/sound-on.png")}));let O,j=new s("../assets/car-horn2.wav"),A=new s("../assets/crash_sound.wav"),D=new s("../assets/highway-sound.mp3"),Y=[new e("../racing-game/assets/driveway1.jpeg",0,4,c),new e("../racing-game/assets/driveway1.jpeg",c.width,4,c)],q=new t("../assets/car1.png",c.width/2,c.height/1.3,!0,4,$,c,H);function P(){x=setInterval(N,20)}function G(){clearInterval(x),x=null}function N(){Y[0].updateDriveWay(Y[1]),Y[1].updateDriveWay(Y[0]),S?D.stop():D.play(),function(){if(z<5)C=1,H=4;else if(z>5&&z<20)k.classList.add("round-counter-animation"),C=2,setTimeout((()=>k.classList.remove("round-counter-animation")),8e3),k.innerHTML=`Round ${C}`,H=5.5;else if(z>20&&z<30)k.classList.add("round-counter-animation1"),C=3,k.innerHTML=`Round ${C}`,H=7;else if(35===z){I.style.display="block",G(),S||D.stop(),i=!1;let e=document.createElement("p");e.innerHTML=`\n        WOW, impressive driving skills!!! <br> <br> \n        Your time is:  ${a} min ${o} sec ${l} ms <br>\n        You passed:   ${z} cars <br> \n        Rage mode left:   ${W} <br> \n        Lives left:   ${R} <br> \n        `,I.appendChild(e),m.classList.add("rage-level-shake")}}();let e=F(155,c.width-190),s=-1*F(150,350);setTimeout((()=>{F(0,1e4)>9950&&B.push(new t("../assets/cabrio.png",e,s,!1,4,$,c,H)),F(0,1e4)>9950&&B.push(new t("../assets/bugatti.png",e,s,!1,4,$,c,H)),F(0,1e4)>9950&&B.push(new t("../assets/ferrari_red.png",e,s,!1,4,$,c,H)),F(0,1e4)>9950&&B.push(new t("../assets/acura1.png",e,s,!1,4,$,c,H))}),1e3),q.updateMovingObject(),q.collideWith;let n=!1;for(let e=0;e<B.length;e++)B[e].updateMovingObject(),B[e].collideWith&&(n=!0);n&&(B.shift(),z++,E.innerHTML=`Passed cars ${z}`);let h=!1;for(let e=0;e<B.length;e++)if(h=q.hit(B[e]),h){if(S||A.play(),I.style.display="block",!(R>0)){G(),S||D.stop(),i=!1;let e=document.createElement("p");e.innerHTML=`\n                    You're a bad driver!!! <br> <br> \n                    Your time is: ${a} min ${o} sec ${l} ms <br>\n                    You passed: ${z} cars <br> \n                    `,I.appendChild(e),m.classList.add("rage-level-shake");break}{null==x?(P(),S||D.play(),i=!0,d()):(G(),S||D.stop(),i=!1),R--;let e=document.createElement("p");e.innerHTML=`<br> <br>Hey, you hit a car! <br> <br>\n                     ${R} collision(s) left`,I.appendChild(e),setTimeout((()=>{e.remove(),I.style.display="none",P(),i=!0,d()}),2500),B=[],f.innerHTML=`Life ${R}`}}!function(){r.clearRect(0,0,c.width,c.height);for(let e=0;e<Y.length;e++)r.drawImage(Y[e].image,0,0,Y[e].image.width,Y[e].image.height,Y[e].x,Y[e].y,c.width,c.width);U(q);for(let e=0;e<B.length;e++)U(B[e])}()}function U(e){r.drawImage(e.image,0,0,e.image.width,e.image.height,e.x,e.y,e.image.width*$,e.image.height*$)}function F(e,t){return Math.floor(Math.random()*(t-e)+e)}}))}()}();
//# sourceMappingURL=main.js.map