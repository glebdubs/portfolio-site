
// // Get DOM elements
// const usernameInput = document.getElementById('usernameInput');
// const fetchBtn = document.getElementById('fetchBtn');
// const loadingMessage = document.getElementById('loadingMessage');
// const errorMessage = document.getElementById('errorMessage');
// const statsContainer = document.getElementById('statsContainer');
// const difficultyContainer = document.getElementById('difficultyContainer');

const API_BASE_URL = 'https://leetcode-stats-api.herokuapp.com';

const username = "glebdubs"

try {
    // Make the API request
    const response = await fetch(`${API_BASE_URL}/${username}`);
    const data = await response.json();

    if (data.status === 'success') {
        displayStats(data);
    } else {
        showError(data.message || 'Failed to fetch stats');
    }
} catch (error) {
    console.error('Error fetching LeetCode stats:', error);
}


function displayStats(data) {
    // Update main stats
    document.getElementById('totalSolved').textContent = data.totalSolved;
    document.getElementById('totalQuestions').textContent = data.totalQuestions;
    document.getElementById('acceptanceRate').textContent = data.acceptanceRate + '%';
    document.getElementById('ranking').textContent = '#' + data.ranking.toLocaleString();
    document.getElementById('contributionPoints').textContent = data.contributionPoints.toLocaleString();

    // Update progress bar
    const solvedPercentage = (data.totalSolved / data.totalQuestions) * 100;
    document.getElementById('solvedProgress').style.width = solvedPercentage + '%';

    // Update difficulty stats
    document.getElementById('easySolved').textContent = data.easySolved;
    document.getElementById('easyTotal').textContent = data.totalEasy;
    document.getElementById('mediumSolved').textContent = data.mediumSolved;
    document.getElementById('mediumTotal').textContent = data.totalMedium;
    document.getElementById('hardSolved').textContent = data.hardSolved;
    document.getElementById('hardTotal').textContent = data.totalHard;

    // Show stats containers
    showStats();
}

function showLoading() {
    loadingMessage.classList.remove('hidden');
    fetchBtn.disabled = true;
    fetchBtn.textContent = 'Loading...';
}

function hideLoading() {
    loadingMessage.classList.add('hidden');
    fetchBtn.disabled = false;
    fetchBtn.textContent = 'Get Stats';
}