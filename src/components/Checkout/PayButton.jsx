import React, { useState } from 'react';

const PayButton = ({ onPaymentComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    // Simular procesamiento de pago
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay de 2 segundos
      
      // Simular éxito (90% de probabilidad)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStatus('success');
        onPaymentComplete && onPaymentComplete('success');
      } else {
        setPaymentStatus('error');
        onPaymentComplete && onPaymentComplete('error');
      }
    } catch (error) {
      setPaymentStatus('error');
      onPaymentComplete && onPaymentComplete('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonContent = () => {
    if (isProcessing) {
      return (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Procesando pago...
        </div>
      );
    }
    
    if (paymentStatus === 'success') {
      return '¡Pago Exitoso!';
    }
    
    if (paymentStatus === 'error') {
      return 'Reintentar Pago';
    }
    
    return 'Pagar Ahora';
  };

  const getButtonStyles = () => {
    if (paymentStatus === 'success') {
      return 'bg-green-600 hover:bg-green-700';
    }
    
    if (paymentStatus === 'error') {
      return 'bg-red-600 hover:bg-red-700';
    }
    
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        {/* Mensaje de estado */}
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  ¡Pago procesado exitosamente!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Tu orden ha sido confirmada. Recibirás un email con los detalles.
                </p>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Error al procesar el pago
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Por favor, verifica tu información y vuelve a intentar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botón de pago */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-md text-white font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyles()}`}
        >
          {getButtonContent()}
        </button>

        {/* Información de seguridad */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 Tu información está protegida con encriptación SSL
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayButton; 