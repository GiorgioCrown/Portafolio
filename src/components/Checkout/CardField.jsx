import React, { useState } from 'react';

const CardField = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [cardErrors, setCardErrors] = useState({});
  const [cardTouched, setCardTouched] = useState({});

  // Función para formatear el número de tarjeta
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Función para formatear la fecha de vencimiento
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Detectar tipo de tarjeta
  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'unknown';
  };

  const validateCardField = (name, value) => {
    switch (name) {
      case 'cardNumber':
        const cleanNumber = value.replace(/\s/g, '');
        if (cleanNumber.length < 13) return 'Número de tarjeta inválido';
        if (cleanNumber.length > 19) return 'Número de tarjeta muy largo';
        return '';
      case 'expiryDate':
        if (value.length < 5) return 'Fecha inválida';
        const [month, year] = value.split('/');
        if (month < 1 || month > 12) return 'Mes inválido';
        return '';
      case 'cvv':
        if (value.length < 3) return 'CVV inválido';
        if (value.length > 4) return 'CVV muy largo';
        return '';
      case 'cardholderName':
        if (value.trim() === '') return 'Nombre del titular es requerido';
        return '';
      default:
        return '';
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar formato según el campo
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validar si el campo ha sido tocado
    if (cardTouched[name]) {
      const error = validateCardField(name, formattedValue);
      setCardErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleCardBlur = (e) => {
    const { name, value } = e.target;
    setCardTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateCardField(name, value);
    setCardErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const cardType = getCardType(cardData.cardNumber);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Información de Pago
      </h2>
      
      <div className="space-y-4">
        {/* Nombre del titular */}
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Titular *
          </label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={cardData.cardholderName}
            onChange={handleCardInputChange}
            onBlur={handleCardBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
              cardErrors.cardholderName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Como aparece en la tarjeta"
            required
          />
          {cardErrors.cardholderName && (
            <p className="text-red-500 text-sm mt-1">{cardErrors.cardholderName}</p>
          )}
        </div>

        {/* Número de tarjeta */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Tarjeta *
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardInputChange}
              onBlur={handleCardBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-12 ${
                cardErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
            {cardType !== 'unknown' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-sm text-gray-500 capitalize">{cardType}</span>
              </div>
            )}
          </div>
          {cardErrors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{cardErrors.cardNumber}</p>
          )}
        </div>

        {/* Fecha de vencimiento y CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Vencimiento *
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={cardData.expiryDate}
              onChange={handleCardInputChange}
              onBlur={handleCardBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                cardErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
            {cardErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.expiryDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cardData.cvv}
              onChange={handleCardInputChange}
              onBlur={handleCardBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                cardErrors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123"
              maxLength="4"
              required
            />
            {cardErrors.cvv && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardField; 