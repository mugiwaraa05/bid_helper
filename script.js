function calculateAdjustedMode(arr) {
  if (arr.length <= 4) return calculateMode(arr); // not enough entries to trim
  const sorted = arr.sort((a, b) => a - b);
  const trimmed = sorted.slice(1, -1); // trim possible outliers
  return calculateMode(trimmed);
}

function calculateMode(arr) {
  const freq = {};
  let max = 0, mode = null;
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > max) {
      max = freq[num];
      mode = num;
    }
  }
  return parseInt(mode);
}

function generateSuggestion() {
  const entryStr = document.getElementById("entryCount").value;
  const strategy = document.getElementById("strategy").value;

  const entries = entryStr.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  if (entries.length === 0) {
    document.getElementById("suggestion").innerText = "Please enter valid numbers.";
    return;
  }

  const adjustedMode = calculateAdjustedMode(entries);
  let suggestion;

  switch(strategy) {
    case 'careful': suggestion = adjustedMode - Math.floor(Math.random() * 10 + 5); break;
    case 'balanced': suggestion = adjustedMode + Math.floor(Math.random() * 6 - 3); break;
    case 'aggressive': suggestion = adjustedMode + Math.floor(Math.random() * 20 + 5); break;
  }

  document.getElementById("suggestion").innerText = `Suggested Bid: ${suggestion}`;
}
