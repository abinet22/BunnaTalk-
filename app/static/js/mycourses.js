function startModule(moduleId) {
    window.location.href = `https://ethiolingo.com/learning/${moduleId}`;
  }
  
  function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
  }
  
  function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
  }
  
  function upgradeToPremium() {
    window.location.href = '//premium';
  }