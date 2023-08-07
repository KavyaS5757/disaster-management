const paymentOption = document.getElementById('paymentOption');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const upiDetails = document.getElementById('upiDetails');
    const netBankingDetails = document.getElementById('netBankingDetails');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendOtpButton = document.getElementById('confirmbutton');

    confirmButton.addEventListener('click', function () {
      // Implement OTP sending logic here
     alert('OTP sent to ' + phoneNumberInput.value);
    });

    paymentOption.addEventListener('change', function () {
      creditCardDetails.style.display = 'none';
      upiDetails.style.display = 'none';
      netBankingDetails.style.display = 'none';

      if (this.value === 'creditCard') {
        creditCardDetails.style.display = 'block';
      } else if (this.value === 'upi') {
        upiDetails.style.display = 'block';
      } else if (this.value === 'netBanking') {
        netBankingDetails.style.display = 'block';
      }
    });