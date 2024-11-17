export const patterns = [
  {
    regex: /The (.+) must be equal to or less than (.+)/,
    template: "The {{value}} must be equal to or less than {{oneValue}}",
  },
  {
    regex: /The (.+) must be equal to or greater than (.+)/,
    template: "The {{value}} must be equal to or greater than {{oneValue}}",
  },
  {
    regex: /The (.+) must be less than (.+)/,
    template: "The {{value}} must be less than {{oneValue}}",
  },
  {
    regex: /Your flights must be booked before (.+) days before the departure date/,
    template: "Your flights must be booked before {{value}} days before the departure date",
  },
  {
    regex: /Your maximum flying time must be within (.+) hour/,
    template: "Your maximum flying time must be within {{value}} hour",
  },
  {
    regex: /Your hotels must be booked before (.+) days before the check-in date/,
    template: "Your hotels must be booked before {{value}} days before the check-in date",
  },
  {
    regex: /The title level (.+) was not found\.;/,
    template: "The title level {{value}} was not found.",
  },
  {
    regex: /The title level (.+) does not available to be deleted\.;/,
    template: "The title level {{value}} does not available to be deleted.",
  },
  {
    regex: /The (.+) policy is not exists\./,
    template: "The {{value}} policy is not exists.",
  },
  {
    regex: /There is an error in deleting the (.+) policy/,
    template: "There is an error in deleting the {{value}} policy",
  },
];
