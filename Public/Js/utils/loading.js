export function Loading(text) {
    const txt = text || "Loading";
    // Create the dialog element
    const dialog = document.createElement("dialog");
  
    // Add content to the dialog
    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="content">${txt}
            <span class="dotCont">
                <div class="dot"></div>
            </span>
            <span class="dotCont">
                <div class="dot"></div>
            </span>
            <span class="dotCont">
                <div class="dot"></div>
            </span>
        </div>
      </div>
    `;
    dialog.style.border = "none";
    const style = `
      dialog {
        border: none;
        width: 400px;
        height: 400px;
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
      }
      .content{
        font-size: 2rem;
        background-color: rgba(255, 255, 255, 0);

      }

      .dialog-content {
        display: flex;
        gap: 10px;
        background-color: rgba(255, 255, 255, 0);

      }
      .dot{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
      }
  
      .dotCont {
        display: inline-block;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
  
      .dotCont:nth-child(1) {
        animation-name: moveUpDown1;
      }
  
      .dotCont:nth-child(2) {
        animation-name: moveUpDown2;
      }
  
      .dotCont:nth-child(3) {
        animation-name: moveUpDown3;
      }
  
      @keyframes moveUpDown1 {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
  
      @keyframes moveUpDown2 {
        0%, 100% {
          transform: translateY(0);
        }
        25%, 75% {
          transform: translateY(-10px);
        }
      }
  
      @keyframes moveUpDown3 {
        0%, 100% {
          transform: translateY(0);
        }
        40%, 90% {
          transform: translateY(-10px);
        }
      }
    `;
  
  
    document.body.appendChild(dialog);  
    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    dialog.appendChild(styleElement);
    dialog.showModal();
  }
  
  export function RemoveModal() {
    const dialog = document.querySelector("dialog");
    if (dialog) {
      dialog.remove();
    }
  }
  
export function SuccessMessage(text, success = true){
  const txt = text || "Success fully added";
  // Create the dialog element
  const dialog = document.createElement("dialog");

  // Add content to the dialog
  if(success){
    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="success-message">
          <h2 class="success-title">Success</h2>
          <p class="success-text">${txt}</p>
          <div class="check-icon">&#10004;</div>
        </div>  
      </div>
    `;
  }else{
    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="success-message">
          <h2 class="success-title">Error</h2>
          <p class="success-text">Ooppss!</p>
          <p class="success-text">Something went wrong!</p>
          <div class="check-icon">&#10006;</div>
        </div>  
      </div>
    `;
  }
  dialog.style.border = "none";

  const style = `
    * {
        border: 0;
    }
    dialog {
      padding: 0;
      border: none important;
      width: 400px;
      height: 400px;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
    }

    .dialog-content {
      z-index: 10;
      display: flex;
      gap: 10px;
      background-color: rgba(255, 255, 255, 0);
      width: 100%;
      height: 100%;

    }
    .success-message {
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 20px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .success-title {
      font-size: 24px;
      color: #2ecc71;
      margin-bottom: 10px;
    }
    
    .success-text {
      font-size: 16px;
      color: #2ecc71;
      margin-bottom: 20px;
    }
    
    .check-icon {
      font-size: 36px;
      color: #2ecc71;
    }
    
  `;


  document.body.appendChild(dialog);  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = style;
  dialog.appendChild(styleElement);
  dialog.showModal();

  setTimeout(() => {
    dialog.remove();
  }, 3000);
}