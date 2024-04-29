import { Deferred } from 'ts-deferred';
import { onBeforeUnmount } from 'vue';

function useDeferred() {
  let deffered = new Deferred<void>();

  const waitingFor = async() => {
    await deffered.promise;
  };
  const resolve = () => {
    deffered.resolve();
  };

  onBeforeUnmount(() => {
    deffered = new Deferred<void>();
  });

  return {
    deffered,
    resolve,
    waitingFor,
  };
}

export { useDeferred };
