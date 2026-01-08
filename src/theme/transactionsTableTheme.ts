export const THEME = {
	Table: `
    display: grid;
    grid-template-columns: 1fr;

    @media (max-width: 640px) {
      .thead {
        display: none;
      }
    }
  `,
	Header: `
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
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
    .tr:not(:last-of-type) {
      border-bottom: 1px solid var(--color-gray-100);
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }
  `,
	Row: `
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    height: auto;

    color: var(--color-gray-500);
    font-size: 0.75rem;
    line-height: 1.5;

    .td:first-of-type {
      padding-left: 3.25rem;
      
      & div {
        color: var(--color-gray-900);
        font-weight: 700;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        & .avatar-wrapper {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 100%;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0.25rem;
        }
      }
    }

    .td:nth-of-type(2) {
      grid-column: 1;
      grid-row: 2;
      padding-left: 3.25rem;
    }
    
    .td:nth-of-type(3) {
      grid-column: 2;
      grid-row: 2;
      justify-self: end;
    }

    .td:last-child {
      justify-self: end;
      font-weight: 700;
      font-size: 0.875rem;

      & .income {
        color: var(--color-green);
      }

      & .expense {
        color: var(--color-red);
      }
    }

    @media (min-width: 640px) {
      grid-template-columns: 3fr 1fr 1fr 1fr;
      gap: 2rem;

      .td:first-of-type {
        padding-left: 0;

        & div .avatar-wrapper {
          position: static
        }
      }

      .td:nth-of-type(2) {
        grid-column: 2;
        grid-row: 1;
        padding: 0;
      }
      
      .td:nth-of-type(3) {
        grid-column: 3;
        grid-row: 1;
        justify-self: start;
      }

      .td:last-of-type {
        grid-column: 4;
      }
    }

    @media (max-width: 400px) {
      .td:first-of-type {
        padding-left: 0;

        & div .avatar-wrapper {
          display: none;
        }
      }

      .td:nth-of-type(2) {
        padding-left: 0;
      }
    }
  `,
	BaseCell: `

  `,
};
