document.getElementById("sendMessage").addEventListener("click", () => {
  const userMessage = document.getElementById("userMessage").value.trim();
  if (userMessage) {
    addMessageToChat(userMessage, "user-message");
    document.getElementById("userMessage").value = ""; // Clear input

    // Add a dummy AI response
    setTimeout(() => {
      addMessageToChat(
        "This is a dummy response. The AI will respond here.",
        "ai-message"
      );
    }, 500);
  }
});

function addMessageToChat(message, className) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.textContent = message;

  document.getElementById("chatContainer").appendChild(messageElement);
}
