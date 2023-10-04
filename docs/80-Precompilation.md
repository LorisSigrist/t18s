# Precompilation

Translations are written using the ICU MessageFormat syntax. This would usually require a runtime library to parse the strings and replace the placeholders with the formatted values. This makes the bundle quite a bit larger.

`t18s` instead compiles each message into a function at build time. This means that no runtime library is needed.

For example, this message:

```js
"{fullName} was born on {birthday, date, long}"; //en

//becomes

(args) =>
  `${args.fullName} was born on ${new Intl.DateTimeFormat("en", {
    dateStyle: "long",
  }).format(args.birthDate)}`;
```

This minifies and compresses quite well.
