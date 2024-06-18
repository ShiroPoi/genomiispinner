const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

const segments = [
    { label: '🎁 $5 Starbucks Gift Card', probability: 0.25 },
    //{ label: '🏅 Headband', probability: 0.15 },
    { label: '🎟️ Grand Prize Raffle Entry', probability: 0.45 },
    { label: '❌ Missed a Shot', probability: 0.30 }
];

const segmentColors = ['#8270e3', '#95e3c1', '#ffeb92'];
const totalSegments = segments.length;
const segmentAngle = (2 * Math.PI) / totalSegments;
const startingAngle = 0;


function drawWheel() {
    for (let i = 0; i < totalSegments; i++) {
        const startAngle = i * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.fillStyle = segmentColors[i % segmentColors.length];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(segments[i].label, canvas.width / 2 - 10, 10);
        ctx.restore();

        resultDiv.textContent = `Spin the Wheel!`;
    }
}

function getRandomSegment() {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < segments.length; i++) {
        cumulativeProbability += segments[i].probability;
        if (rand < cumulativeProbability) {
            return segments[i];
        }
    }
}

function spinWheel() {
    const randomSegment = getRandomSegment();
    const segmentIndex = segments.indexOf(randomSegment);
    const randomAngle = (segmentIndex * (360 / segments.length)) + (Math.random() * (360 / segments.length));
    const spinAngle = randomAngle + (360 * 5);

    canvas.style.transition = 'transform 4s ease-out';
    canvas.style.transform = `rotate(${-spinAngle}deg)`;

    setTimeout(() => {
        if (segmentIndex == 2) {
            resultDiv.textContent = `Missed a Shot, Join our IG Giveaway @genomii.ai for Another Chance to Win`;
        }
        else {
            resultDiv.textContent = `You won: ${randomSegment.label}`;
        }
        canvas.style.transition = '';
        canvas.style.transform = `rotate(${-spinAngle % 360}deg)`;
    }, 4000);
}

spinButton.addEventListener('click', spinWheel);

drawWheel();
