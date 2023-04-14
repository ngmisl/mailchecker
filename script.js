document.getElementById("email-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email-input");
  const resultDiv = document.getElementById("result");
  const email = emailInput.value;

  resultDiv.textContent = "Checking email...";

  try {
    const response = await fetch(
      "https://mailchecker-api.onrender.com/verify-email/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    const validSyntax = data.has_valid_syntax;
    const hasMxRecords = data.mx.has_mx_records;
    const isDisposable = data.misc.is_disposable;
    const isFree = data.misc.is_free;

    const validSyntaxText = `Valid Syntax: ${validSyntax ? "True" : "False"}`;
    const mxRecordsText = `MX Records: ${hasMxRecords ? "True" : "False"}`;
    const disposableText = `Is Disposable: ${isDisposable ? "True" : "False"}`;
    const freeText = `Is Free: ${isFree ? "True" : "False"}`;

    resultDiv.innerHTML = `
        <p class="${validSyntax ? "green" : "red"}">${validSyntaxText}</p>
        <p class="${hasMxRecords ? "green" : "red"}">${mxRecordsText}</p>
        <p class="${isDisposable ? "red" : "green"}">${disposableText}</p>
        <p class="${isFree ? "red" : "green"}">${freeText}</p>
    `;
  } catch (error) {
    console.error("Error fetching email verification:", error);
    resultDiv.textContent =
      "Error occurred while checking the email. Please try again.";
  }
});
