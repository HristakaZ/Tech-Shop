using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using Tech_Shop.Services.Shared.Contracts;
using Tech_Shop.Settings;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.Services.Shared
{
    public class MailingService : IMailingService
    {
        private readonly AppSettings appSettings;
        public MailingService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }
        public void SendForgottenPasswordEmail(ForgottenPasswordViewModel forgottenPasswordViewModel, string password)
        {
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Tech Shop", appSettings.Email));
            message.To.Add(new MailboxAddress(forgottenPasswordViewModel.Email, forgottenPasswordViewModel.Email));
            message.Subject = "Forgotten password request";
            message.Body = new TextPart("plain")
            {
                Text = @$"Hello, {forgottenPasswordViewModel.Email}. It seems like you have issued a forgotten password request.
                              Your new password which you should change after logging in will be {password}"
            };

            using (var client = new SmtpClient())
            {
                client.Connect(appSettings.SmtpService, appSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                client.Authenticate(appSettings.Email, appSettings.Password);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
