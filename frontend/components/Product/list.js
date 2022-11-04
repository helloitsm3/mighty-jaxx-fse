import { useApp } from "../../hooks/useApp";

const ProductList = () => {
  const { appState } = useApp();
  const docs = appState.productlist.docs;

  if (docs.length === 0) {
    return <div>There is currently no product</div>;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-left">
          <th>ID</th>
          <th>Image</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc, index) => {
          const { _id, sku, title, image, createdAt, updatedAt } = doc;
          return (
            <tr key={index}>
              <td>{_id}</td>
              <td>{image}</td>
              <td>{sku}</td>
              <td>{title}</td>
              <td>{createdAt}</td>
              <td>{updatedAt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductList;
