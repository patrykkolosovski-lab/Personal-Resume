const projects = {"grades": {"title": "Grade Dashboard", "role": "Team leader · 6-person team", "description": "An interactive Java dashboard for exploring student grades and predicting subject outcomes, combining data visualisation with a custom tree-based model.", "tags": ["Java", "JavaFX", "Machine learning"], "images": [["grades-charts", "Grade distribution dashboard"], ["grades-prediction", "Grade prediction and evaluation"]], "detail": "I led a six-person team on this completed project. The application combines interactive grade analysis with subject predictions and holdout evaluation."}, "putting": {"title": "Crazy Putting", "role": "Team member · 6-person team", "description": "A golf simulator combining numerical physics with automated shot selection, exploring rule-based strategies, hill climbing, and regression-based optimisation.", "tags": ["Java", "Simulation", "Optimisation"], "images": [["putting-course", "Golf simulation and automated shot selection"], ["putting-time", "ODE solver time plot"], ["putting-phase", "ODE solver phase-space plot"], ["putting-setup", "Course setup"]], "detail": "I contributed as a member of a six-person team. This completed project includes numerical solvers, configurable courses, and automated shot-selection strategies."}, "treasurer": {"title": "Treasurer", "role": "Solo project", "description": "A desktop finance workspace for student associations, bringing together local receipt recognition, transaction management, and portable backups. Built as a productivity tool for my Treasurer position at MSV Incognito.", "tags": ["React", "Tauri", "Local OCR"], "images": [["treasurer-receipts", "Receipt library"], ["treasurer-settings", "Categories and financial periods"], ["treasurer-transaction", "Transaction entry"], ["treasurer-home", "Financial overview"]], "detail": "I built this completed application independently to support my responsibilities as Treasurer of MSV Incognito."}, "befit": {"title": "BeFit", "role": "Solo project", "description": "An iOS weight-tracking app with offline storage, progress visualisation, and optional iCloud synchronisation.", "tags": ["SwiftUI", "SwiftData", "CloudKit"], "images": [["befit-home", "BeFit home dashboard"], ["befit-graph", "Weight trends and history"]], "detail": "I built this completed iOS application independently, including its local storage, progress views, and synchronisation workflow."}};

const dialog=document.querySelector('#details');
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const project=projects[button.dataset.project];
 document.querySelector('#dialog-type').textContent='Completed · '+project.role;
 document.querySelector('#dialog-title').textContent=project.title;
 const content=document.querySelector('#dialog-content');content.replaceChildren();
 [project.description,project.detail].forEach(text=>{const p=document.createElement('p');p.textContent=text;content.append(p)});
 if(button.dataset.project === "befit") renderBefitDemo(content);
 else project.images.forEach(([file,caption])=>{const figure=document.createElement('figure');const link=document.createElement('a');link.href='assets/projects/'+file+'.png';link.target='_blank';link.rel='noopener';link.setAttribute('aria-label','Open full-size screenshot: '+caption);const img=document.createElement('img');img.src=link.href;img.alt=caption;img.loading='lazy';link.append(img);const label=document.createElement('figcaption');label.textContent=caption;figure.append(link,label);content.append(figure)});
 dialog.showModal();dialog.scrollTop=0;
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
const track=document.querySelector('#project-cards');
const prev=document.querySelector('#projects-prev'),next=document.querySelector('#projects-next');
function updateArrows(){prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2}
function move(direction){track.scrollBy({left:direction*(track.querySelector('.card').getBoundingClientRect().width+20),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
track.addEventListener('scroll',updateArrows);window.addEventListener('resize',updateArrows);updateArrows();

function renderBefitDemo(content){
 const screens=[
 ['home','Dashboard','Your progress at a glance','Current weight, weekly average, and a target overview in one place.'],
 ['entry','Add weight','A simple daily check-in','Choose a date, enter your weight, and add an optional note.'],
 ['graph','Trends','See the bigger picture','Explore your weight history across different time ranges.'],
 ['metrics','Metrics','Make it personal','Review body metrics and switch between metric and imperial units.'],
 ['onboarding','Getting started','Local first, from day one','Profile setup introduces optional iCloud sync while keeping the app useful offline.'],
 ['settings','Settings','Your routine, your preferences','Review sync status, schedule reminders, and explore app settings.']
 ];
 const demo=document.createElement('div');demo.className='befit-demo';
 demo.innerHTML='<div class="demo-device"><a class="demo-full" target="_blank" rel="noopener"><img class="demo-screen" width="942" height="2048"></a></div><div class="demo-story"><p class="eyebrow">BeFit / Screenshot walkthrough</p><h3 class="demo-title"></h3><p class="demo-caption" aria-live="polite"></p><div class="demo-choices" aria-label="Choose a BeFit screen"></div><div class="demo-controls"><button class="demo-back" aria-label="Previous screen">←</button><span class="demo-count"></span><button class="demo-next" aria-label="Next screen">→</button></div><p class="demo-note">Explore all six screens. Select the phone image to view it full size.</p></div>';
 let current=0;
 const choices=demo.querySelector('.demo-choices');
 screens.forEach((screen,index)=>{const button=document.createElement('button');button.textContent=screen[1];button.addEventListener('click',()=>show(index));choices.append(button)});
 function show(index){current=(index+screens.length)%screens.length;const [file,label,title,caption]=screens[current];const image=demo.querySelector('.demo-screen');image.src='assets/projects/befit-'+file+'.png';image.alt='BeFit '+label;demo.querySelector('.demo-full').href=image.src;demo.querySelector('.demo-full').setAttribute('aria-label','Open '+label+' screenshot full size');demo.querySelector('.demo-title').textContent=title;demo.querySelector('.demo-caption').textContent=caption;demo.querySelector('.demo-count').textContent=(current+1)+' / '+screens.length;[...choices.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)))}
 demo.querySelector('.demo-back').addEventListener('click',()=>show(current-1));demo.querySelector('.demo-next').addEventListener('click',()=>show(current+1));
 content.append(demo);show(0);
}
