using System.Net.Mail;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.Services.Shared.Contracts
{
    public interface IMailingService
    {
        void SendForgottenPasswordEmail(ForgottenPasswordViewModel forgottenPasswordViewModel, string password);
    }
}
