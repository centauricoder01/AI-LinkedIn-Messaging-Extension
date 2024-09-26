// Create and inject the popup into the DOM
function createPopup() {
  // Check if the popup already exists, if so, don't create it again
  if (document.getElementById("ai-popup")) {
    return;
  }

  // Create the popup container
  const popup = document.createElement("div");
  popup.id = "ai-popup";
  popup.style.position = "fixed";
  popup.style.bottom = "40%";
  popup.style.right = "35%";
  popup.style.width = "30%";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "1px solid #ccc";
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  popup.style.zIndex = "10000";
  popup.style.borderRadius = "8px";
  popup.style.padding = "16px";
  popup.style.color = "#000"; // Set the text color to black

  // Add content inside the popup
  popup.innerHTML = `
    <div style="display: flex; justify-content: flex-end; align-items: center;">
      <button id="close-popup" style="background: none; border: none; font-size: 16px; cursor: pointer; color: #000; font-weight:bolder; display:none;">&times;</button> <!-- Black color for close button -->
    </div>
    <input id="ai-input" placeholder="Enter your prompt" style="width: 100%; margin-top: 16px; padding: 8px; border-radius: 4px; color: #000; border: 1px solid #ccc;"></input>
<div id="ai-response" style="margin-top: 16px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; overflow-y: auto; color: #000; display: none;"></div>

<div style="display: flex; justify-content: flex-end; align-items: center; gap:1rem">
 <button id="insert-button" style="margin-top: 12px; width: 20%; padding: 8px; background-color: #0073b1; color: #fff; border: none; border-radius: 4px; cursor: pointer; display: none;">
      Insert
    </button>
<button id="generate-button" style="margin-top: 12px; width: 20%; padding: 8px; background-color: #0073b1; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
      Generate
    </button>
   
</div>
    
  `;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Close button functionality
  document.getElementById("close-popup").addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  // Generate button functionality (this is dummy functionality for now)
  document.getElementById("generate-button").addEventListener("click", () => {
    const response =
      "Thank you for the opportunity! If you have any more questions, feel free to ask."; // Dummy response
    document.getElementById("ai-response").style.display = "block";
    document.getElementById("ai-response").innerText = response;
    document.getElementById("insert-button").style.display = "block"; // Show the Insert button after generating a response
  });

  // Insert button functionality
  document.getElementById("insert-button").addEventListener("click", () => {
    const response = document.getElementById("ai-response").innerText;
    const messageInput = document.querySelector('[contenteditable="true"]'); // Target LinkedIn's message input
   if (messageInput) {
     // Use document.execCommand to insert text properly inside contenteditable
     messageInput.focus(); // Ensure the message box is focused
     document.execCommand("insertText", false, response); // Insert the response text
     document.body.removeChild(popup); // Remove the popup after insertion
   }
  });
}

// Add the AI icon button to the LinkedIn message input box
function addIconButton() {
  const messageBox = document.querySelector('[contenteditable="true"]'); // LinkedIn's message input box
  if (!messageBox) return;

  // Check if the button already exists to avoid adding it multiple times
  if (document.getElementById("ai-button")) {
    return;
  }

  // Create the icon button
  const iconButton = document.createElement("button");
  iconButton.id = "ai-button";
  iconButton.innerHTML = "AI";
  iconButton.style.position = "absolute";
  iconButton.style.bottom = "10px";
  iconButton.style.right = "10px";
  iconButton.style.padding = "8px";
  iconButton.style.backgroundColor = "#0073b1";
  iconButton.style.color = "#fff";
  iconButton.style.border = "none";
  iconButton.style.borderRadius = "50%";
  iconButton.style.cursor = "pointer";
  iconButton.style.zIndex = "1000";

  // Append the button to the message input box's parent container
  const parentContainer = messageBox.closest("div");
  parentContainer.style.position = "relative"; // Ensure the parent container has position relative for the icon to position correctly
  parentContainer.appendChild(iconButton);

  // When the button is clicked, create the popup
  iconButton.addEventListener("click", createPopup);
}

// Observe the DOM to detect when the LinkedIn message box is available
const observer = new MutationObserver(() => {
  if (document.querySelector('[contenteditable="true"]')) {
    addIconButton();
  }
});

// Start observing the DOM
observer.observe(document.body, { childList: true, subtree: true });
