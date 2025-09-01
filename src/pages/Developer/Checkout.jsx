import React from 'react';
import OrderSummary from '../../components/Checkout/OrderSummary';
import PaymentForm from '../../components/Checkout/PaymentForm';
import CardField from '../../components/Checkout/CardField';
import PayButton from '../../components/Checkout/PayButton';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Checkout Simulator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área del formulario */}
          <div className="lg:col-span-2 space-y-6">
            <PaymentForm />
            <CardField />
            <PayButton />
          </div>
          
          {/* Resumen de la orden */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 