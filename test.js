/**
 * Класс для работы с API
 *
 * @author		User Name
 * @version		v.1.0 (25/11/2024)
 */
class Api {
  constructor() {}

  /**
   * Заполняет строковый шаблон template данными из объекта object
   *
   * @author		User Name
   * @version		v.1.0 (25/11/2024)
   * @param		{object} object
   * @param		{string} template
   * @return		{string}
   */
  get_api_path(object, template) {
    // Заменяем плейсхолдеры в шаблоне значениями из объекта
    let result = template.replace(/%(\w+)%/g, (match, key) => {
      // Кодирует значение и заменяет, если ключ существует
      return encodeURIComponent(object[key] || "");
    });

    return result;
  }
}

let user = {
  id: 20,
  name: "John Dow",
  role: "QA",
  salary: 100,
};

let api_path_templates = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%",
];

let api = new Api();

let api_paths = api_path_templates.map((api_path_template) =>
  api.get_api_path(user, api_path_template)
);

console.log(JSON.stringify(api_paths));

// Ожидаемый результат
let expected_result = [
  "/api/items/20/John%20Dow",
  "/api/items/20/QA",
  "/api/items/20/100",
];
console.log("Expected:", JSON.stringify(expected_result));
console.log(
  "Matches Expected:",
  JSON.stringify(api_paths) === JSON.stringify(expected_result)
);
