export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('E-email already exists.')
  }
}
