window.addEventListener("load", function(){
  const canvas = this.document.getElementById("canvas"); //canvas element
  const ctx = canvas.getContext("2d"); //ready to draw
  const circles = []; //array of circles
  let x, y = null; //screen x, y positions when mouse moves

  const colors = [
    "#FF6B6B", // Soft Red
    "#FFD93D", // Bright Yellow
    "#6BCB77", // Soft Green
    "#4D96FF", // Bright Blue
    "#FF9F1C", // Vivid Orange
    "#EE6C4D", // Warm Coral
    "#00B8A9", // Aqua Teal
    "#9D4EDD", // Bright Purple
    "#F4D35E", // Mustard Yellow
    "#3D5A80", // Muted Blue
    "#FF85A1", // Light Pink
    "#5D5FEF", // Electric Indigo
    "#FFBA08", // Gold
    "#00CC99", // Bright Mint
    "#FA8072", // Salmon
    "#7FDBFF", // Sky Blue
    "#FF7F50", // Coral
    "#C297FF", // Lavender
    "#B8F2E6", // Pale Aqua
    "#FFCA3A"  // Vibrant Yellow
  ];

  // when windo resizes, it stores trhe data and display again so the content does not disappear on resize
  function resize(){
    const tempData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(tempData, 0, 0);
  }
  resize();

  // define coordinates for each circle
  for(let i=0; i<100; i++){
    let obj = {
      x: Math.floor(Math.random()*canvas.width),
      y: Math.floor(Math.random()*canvas.height),
      r: Math.random()*5+5,
      s: 0,
      e: Math.PI*2,
      color: colors[Math.floor(Math.random()*colors.length)],
      vx: (Math.random()-0.5)*2,
      vy: (Math.random()-0.5)*2
    };
    circles.push(obj)
  }

  // draw circles
  function draw(){
    for(let circle of circles){
      ctx.beginPath();
      ctx.fillStyle = circle.color;
      ctx.arc(circle.x, circle.y, circle.r, circle.s, circle.e);
      ctx.fill();
    }
  }

  //update circle position
  function update(){
    circles.forEach(c => {
      c.x +=c.vx;
      c.y+= c.vy;

      if(c.x+c.r > canvas.width || c.x-c.r <0){
        c.vx = -c.vx
      }
      if(c.y+c.r > canvas.height || c.y-c.r <0){
        c.vy = -c.vy
      }
    });
  }

  // animations
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear previous frame
    draw();
    update();
    connectingLines();
    requestAnimationFrame(animate);
  }
  animate();

  // draw lines
  function connectingLines(){
    if (x === null || y === null) return;
        
    let d = window.innerWidth < 400 ? 100 : 200;
    for(let circle of circles){
      let distance = Math.sqrt((x-circle.x)**2 + (y-circle.y)**2)
      if(distance < d){
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(circle.x, circle.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }

  // if we call lines function here it will not create lines 
  // because of animation function which changes the screen continuosly
  // so we are changing x, y values which will continusly call within animation
  window.addEventListener("mousemove", e => {
    x = e.clientX;
    y = e.clientY;
  });
  document.addEventListener("mouseleave", () => {
    x = null;
    y = null;
  });

window.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  x = touch.clientX;
  y = touch.clientY;
}, { passive: true });

window.addEventListener("touchend", () => {
  x = null;
  y = null;
});

document.body.addEventListener('touchstart', e => {
  if (e.target === canvas) e.preventDefault();
}, { passive: false });


  this.window.addEventListener("resize", resize)
})