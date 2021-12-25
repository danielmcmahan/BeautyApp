export const usePopUp = (modalId, dataTarget) => {
  const modal = document.querySelector(`#${modalId}`);
  //   const actionToggler = document.querySelector(dataTarget).dataset.bsTarget;

  if (modalId === dataTarget) {
    modal && modal.classList.add("active");
  } else {
    modal && modal.classList.remove("active");
  }
};
