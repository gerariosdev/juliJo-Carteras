"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [step, setStep] = useState<"resumen" | "envio" | "pago">("resumen");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    number: "",
    city: "",
    province: "",
    zipCode: "",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/carrito">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-stone-900">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { key: "resumen", label: "Resumen" },
          { key: "envio", label: "Envío" },
          { key: "pago", label: "Pago" },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s.key
                  ? "bg-amber-700 text-white"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              {i + 1}
            </div>
            <span className="ml-2 text-sm font-medium text-stone-700 hidden sm:inline">
              {s.label}
            </span>
            {i < 2 && <div className="w-12 sm:w-24 h-px bg-stone-200 mx-2 sm:mx-4" />}
          </div>
        ))}
      </div>

      {step === "resumen" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Resumen del pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-stone-400">
              <p>No hay productos en el carrito</p>
              <Link href="/categoria/carteras">
                <Button variant="link" className="text-amber-700 mt-2">
                  Ver productos
                </Button>
              </Link>
            </div>
            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-amber-700 text-xl">$0</span>
            </div>
            <Button
              onClick={() => setStep("envio")}
              className="w-full bg-amber-700 hover:bg-amber-800"
              disabled
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "envio" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Dirección de envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium block mb-1">
                  Nombre de la dirección
                </label>
                <Input placeholder="Casa, Trabajo..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium block mb-1">Calle</label>
                <Input placeholder="Av. Siempre Viva" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Número</label>
                <Input placeholder="123" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Piso/Depto
                </label>
                <Input placeholder="Opcional" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Ciudad</label>
                <Input placeholder="Resistencia" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Provincia
                </label>
                <Input placeholder="Chaco" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Código postal
                </label>
                <Input placeholder="3500" />
              </div>
            </div>
            <Button
              onClick={() => setStep("pago")}
              className="w-full bg-amber-700 hover:bg-amber-800"
            >
              Ir a pagar
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "pago" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Método de pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500 mb-4">
              Serás redirigido a Mercado Pago para completar el pago de forma
              segura.
            </p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 py-6 text-lg">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              Pagar con Mercado Pago
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
