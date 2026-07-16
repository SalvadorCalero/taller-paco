<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token; // 1. Declaramos la propiedad pública

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token; // 2. Asignamos el valor recibido
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        // 3. Usamos $this->token correctamente
        $resetUrl = url(route('password.reset', [
            'token' => $this->token, 
            'email' => $notifiable->getEmailForPasswordReset()
        ], false));

        return (new MailMessage)
            ->subject('Restablecer contraseña')
            ->line('Estás recibiendo este correo porque recibimos una solicitud de restablecimiento de contraseña para tu cuenta.')
            ->action('Restablecer contraseña', $resetUrl)
            ->line('Este enlace de restablecimiento de contraseña expirará en 60 minutos.')
            ->line('Si no solicitaste un restablecimiento de contraseña, no se requiere ninguna otra acción.');
    }
}