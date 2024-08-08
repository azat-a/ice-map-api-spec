export function registerHelpers(handlebars) {
  handlebars.registerHelper('uppercase', (string) => {
      return string.toUpperCase();
  });

  handlebars.registerHelper('lowercase', (string) => {
      return string.toLowerCase();
  });

  handlebars.registerHelper('capitalize', (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  });
}
