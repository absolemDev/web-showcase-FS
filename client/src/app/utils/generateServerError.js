export function generateServerError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email или пароль введены некорректно";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    case "EMAIL_NOT_FOUND":
      return "Email или пароль введены некорректно";
    case "Network Error":
      return "Сервер не досупне. Проверте сетевое подключение";
    default:
      return "Ошибка на сервере. Попробуйте позже";
  }
}
