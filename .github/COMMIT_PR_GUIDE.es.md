# Guia de Nombres para Rama, Commit y PR (ES)

Referencia rapida para mantener commits y PRs alineados con los checks del proyecto.

## 1) Formato permitido para commit y titulo de PR

Usa Conventional Commits:

```text
type(scope): descripcion corta
```

Tipos permitidos en este repositorio:

- feat
- fix
- docs
- style
- refactor
- test
- chore
- perf
- ci
- revert

Notas:

- type en minusculas.
- scope opcional en PR title, recomendado.
- No terminar el subject con punto.
- Largo maximo del header: 100 caracteres.
- La descripcion del PR debe tener al menos 20 caracteres.

## 2) Formato recomendado para nombre de rama

No esta validado por CI, pero se recomienda:

```text
<type>/<tema-corto-kebab-case>
```

Ejemplos:

- feat/validar-rfc-cliente
- fix/corregir-parse-float-null
- ci/endurecer-pr-checks
- docs/actualizar-branch-protection
- refactor/separar-utils-fechas

## 3) Ejemplos listos para usar

### Ejemplo A

- Rama: feat/validar-rfc-cliente
- Commit: feat(customers): add RFC format validation on customer save
- PR title: feat(customers): add RFC format validation on customer save
- PR body: Se agrega validacion de RFC al guardar clientes, con manejo de null y pruebas unitarias.

### Ejemplo B

- Rama: fix/safeparsefloat-null
- Commit: fix(utils): handle null and undefined in safeParseFloat
- PR title: fix(utils): handle null and undefined in safeParseFloat
- PR body: Se corrigen casos borde de parseo y se agregan pruebas para null y undefined.

### Ejemplo C

- Rama: ci/validar-xml-en-ci
- Commit: ci(actions): install libxml2-utils before XML validation
- PR title: ci(actions): install libxml2-utils before XML validation
- PR body: Se estabiliza el job de validacion XML instalando la dependencia xmllint en el runner.

## 4) Plantillas CLI

```bash
# Commit
git commit -m "feat(scope): descripcion corta"

# PR (de tu rama hacia develop)
gh pr create \
  --base develop \
  --head feat/tu-rama \
  --title "feat(scope): descripcion corta" \
  --body "Que cambio, como se probo y riesgos conocidos."
```
