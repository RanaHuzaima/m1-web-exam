export class BikeNotFoundError extends Error {
  constructor() {
    super("Bike not found");
  }
}

export class BikeHasSalesError extends Error {
  constructor() {
    super("Bike has sales");
  }
}
