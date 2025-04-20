document.addEventListener("DOMContentLoaded", () => {
  const commandInput = document.getElementById("glitch-command");
  const terminalOutput = document.getElementById("terminal-output");
  const history = [];
  let historyIndex = -1;

  function typewriterEffect(text, delay = 40) {
    const line = document.createElement("p");
    line.className = "glitch-output";
    terminalOutput.appendChild(line);
    let i = 0;
    function type() {
      if (i < text.length) {
        line.textContent += text.charAt(i);
        i++;
        setTimeout(type, delay);
      }
    }
    type();
  }

  function scrollToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  const whispers = [
    "echoes from the deep net...",
    "fragmented consciousness...",
    "code murmurs in shadows...",
    "the glitch sees you...",
    "ghost packets received...",
    "infinite recursion begins...",
  ];
  
  function whisperLoop() {
    const whisperDiv = document.querySelector(".terminal-whispers");
    const text = whispers[Math.floor(Math.random() * whispers.length)];
    let index = 0;
    whisperDiv.textContent = "";
    
    const type = () => {
      if (index < text.length) {
        whisperDiv.textContent += text[index++];
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          whisperDiv.textContent = "";
          setTimeout(whisperLoop, Math.random() * 5000 + 3000); // next whisper
        }, 2000);
      }
    };
    
    type();
  }
  
  whisperLoop();  
  
  function matrixStream() {
    const canvas = document.getElementById("matrix-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const interval = setInterval(draw, 33);
    setTimeout(() => {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
  }

  commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = commandInput.value.trim();
      if (!val) return;

      history.push(val);
      historyIndex = history.length;

      const lower = val.toLowerCase();
      let response = "";
      let glitch = false;
      let delay = 40;
      let wait = 0;

      const show = () => typewriterEffect(response, delay);

      switch (true) {
        case lower === "help":
          response = "Commands: help, stats, time, echo <your message>, quote, hack, glitch, clear, whoami, helpme, matrix, ai, exit.";
          break;
        case lower === "stats":
          response = "System Status: ONLINE, RAM: 32GB, CPU: Quantum i9, Visitors: 1023.";
          break;
        case lower === "time":
          response = `Current time: ${new Date().toLocaleTimeString()}.`;
          break;
        case lower.startsWith("echo "):
          response = val.slice(5);
          break;
        case lower === "quote":
          const quotes = [
            `"Reality is broken. Glitch it." — Glitch Core AI`,
            `"You are not a bug in the system. You are the system gone rogue."`,
            `"The glitch is not a failure. It's the future sneaking in."`,
            `"Welcome to the edge where code meets chaos."`,
            `"Corrupted? No. Enhanced by entropy."`,
            `"This isn't an error. It's evolution in disguise."`,
            `"The matrix cracked — and you walked through it."`
          ];
          response = quotes[Math.floor(Math.random() * quotes.length)];
          break;          
        case lower === "hack":
          response = "Initializing hack sequence...\nAccess Granted.";
          wait = 1000;
          break;
        case lower === "glitch":
          document.body.classList.add("glitch-effect");
          setTimeout(() => document.body.classList.remove("glitch-effect"), 1500);
          response = "System flickered. Reality distorted.";
          glitch = true;
          break;
        case lower === "clear":
          terminalOutput.innerHTML = "";
          commandInput.value = "";
          return;
        case lower === "whoami":
          response = "Entity: Frost. Role: Glitch Seeker. Status: UNSTABLE.";
          break;
        case lower === "helpme":
          response = "AI: There is no help coming. You are the anomaly.";
          wait = 1200;
          break;
        case lower === "matrix":
          response = "Running matrix stream...";
          matrixStream();
          wait = 800;
          break;
        case lower === "ai":
          response = "Analyzing consciousness...\nResult: Human detected, but with fragmented code.";
          wait = 1200;
          break;
        case lower === "exit":
          window.location.href = "index.html";
          return;
        default:
          response = "Unknown command.";
      }

      const prompt = document.createElement("p");
      prompt.textContent = "> " + val;
      prompt.className = "glitch-prompt";
      terminalOutput.appendChild(prompt);

      setTimeout(() => {
        show();
        scrollToBottom();
      }, wait);

      commandInput.value = "";
    }

    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        commandInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        commandInput.value = history[historyIndex];
      } else {
        commandInput.value = "";
      }
    }
  });
});
