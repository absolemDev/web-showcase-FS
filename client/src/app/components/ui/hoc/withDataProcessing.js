import DataProcessingProvider from "../../../hooks/useDataProcessing";

const withDataProcessing =
  (Component) =>
  ({ ...props }) => {
    return (
      <DataProcessingProvider>
        <Component {...props} />
      </DataProcessingProvider>
    );
  };

export default withDataProcessing;
