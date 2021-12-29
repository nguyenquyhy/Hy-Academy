# Styling

Bulma (https://bulma.io/) is used as the main CSS framework.

However, Bulma classes should be used only in components inside `src/controls` and `src/layouts`. This allows minimizing impact to modules should we need to change of CSS framework in the future.

## Customization

Customization to Bulma is done via SASS override in `src/sass/styles.scss` following https://bulma.io/documentation/customize/with-node-sass/.

Current theme is got from https://jenil.github.io/bulmaswatch/superhero/.