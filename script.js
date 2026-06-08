
const openingMatch=new Date("2026-06-11T16:00:00");

const brazilMatches=[
{id:"br1",date:new Date("2026-06-13T19:00:00")},
{id:"br2",date:new Date("2026-06-19T22:00:00")},
{id:"br3",date:new Date("2026-06-24T19:00:00")}
];

function countdown(target){
const diff=target-new Date();
if(diff<=0) return "Começou!";

const d=Math.floor(diff/86400000);
const h=Math.floor(diff/3600000%24);
const m=Math.floor(diff/60000%60);
const s=Math.floor(diff/1000%60);

return `${d}d ${h}h ${m}m ${s}s`;
}

function update(){
const diff=openingMatch-new Date();

document.getElementById("days").textContent=Math.max(0,Math.floor(diff/86400000));
document.getElementById("hours").textContent=Math.max(0,Math.floor(diff/3600000%24));
document.getElementById("minutes").textContent=Math.max(0,Math.floor(diff/60000%60));
document.getElementById("seconds").textContent=Math.max(0,Math.floor(diff/1000%60));

brazilMatches.forEach(m=>{
document.getElementById(m.id).textContent=countdown(m.date);
});
}
update();
setInterval(update,1000);
