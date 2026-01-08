export const THEME = {
	Table: `
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;

    @media (max-width: 640px) {
      .thead {
        display: none;
      }
    }
  `,
	Header: `
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    padding-block: 0.75rem;
    border-bottom: 1px solid var(--color-gray-100);
    margin-bottom: 1.5rem;

    .th div {
      text-wrap: wrap;
      font-weight: 400;
      font-size: 0.75rem;
      color: var(--color-gray-500);
      line-height: 1.5;.
      font-family: 'Public Sans', system-ui, Avenir, Helvetica, Arial, sans-serif;
    }

    .th:last-child {
      justify-self: end;
    }
  `,
	HeaderRow: `
  `,
	HeaderCell: `
  `,
	Body: `
    height: 100%;

    .tr:not(:last-of-type) {
      border-bottom: 1px solid var(--color-gray-100);
      padding-bottom: 1.25rem;
      margin-bottom: 1.25rem;
    }
  `,
	Row: `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    height: auto;

    color: var(--color-gray-500);
    font-size: 0.75rem;
    line-height: 1.5;

    .td:first-of-type {
      
      & div {
        color: var(--color-gray-900);
        font-weight: 700;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        & .avatar-wrapper {
          height: 2rem;
          width: 2rem;
          border-radius: 100%;
          overflow: hidden;
        }
      }
    }

    .td:nth-of-type(2) {
      grid-column: 1;
      grid-row: 2;
      color: var(--color-green);
      
      & > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    
    .td:last-child {
      justify-self: end;
      grid-column: 2;
      grid-row: 2;
      color: var(--color-gray-900);
      font-weight: 700;
      font-size: 0.875rem;

      & .due-soon {
        color: var(--color-red);
      }
    }

    @media (min-width: 640px) {
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;

      .td:nth-of-type(2) {
        grid-column: 2;
        grid-row: 1;
      }
      
      .td:nth-of-type(3) {
        grid-column: 3;
        grid-row: 1;
        justify-self: end;
      }
    }

    @media (max-width: 360px) {
      .td:first-of-type {
        & div .avatar-wrapper {
          display: none;
        }
      }
    }
  `,
	BaseCell: `

  `,
};
