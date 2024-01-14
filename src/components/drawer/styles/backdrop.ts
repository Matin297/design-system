import {css} from 'lit';

export default css`
  .drawer[open]::backdrop {
    animation: backdrop-fade-in 250ms;
    background-color: hsl(240 3.8% 46.1% / 33%);
  }

  @keyframes backdrop-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
