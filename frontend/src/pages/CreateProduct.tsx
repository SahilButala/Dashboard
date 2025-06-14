import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CreateProductsinitialData, { type product } from "../config/data";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch } from "@/hooks";
import {
  createproducts,
  deleteProduct,
  getProducts,
  updateproducts,
} from "@/store/products";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const CreateProduct = () => {
  const [formdata, setformdata] = useState(CreateProductsinitialData);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { products } = useSelector((state: RootState) => state.product) as {
    products: (product & { _id?: string })[];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finaldata = {
      ...formdata,
      price: Number(formdata.price),
      stocks: Number(formdata.stocks),
    };
    delete (finaldata as any)._id;

    dispatch(createproducts({ formdata: finaldata })).then((data: any) => {
      if (data?.payload?.success) {
        dispatch(getProducts());
        setIsCreateOpen(false);
        setformdata(CreateProductsinitialData);
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct({ id })).then((data: any) => {
      if (data?.payload?.success) {
        dispatch(getProducts());
      }
    });
  };

  const updateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateproducts({ id: editProductId, formdata })).then(
      (data: any) => {
        if (data?.payload?.success) {
          setEditProductId(null);
          setformdata(CreateProductsinitialData);

          setIsCreateOpen(false)
          dispatch(getProducts());
        }
      }
    );
  };

  return (
    <div>
      <Tabs defaultValue="products" className="w-full mt-2">
        <TabsList>
          <Button
            onClick={() => {
              setIsCreateOpen(true),
                setEditProductId(null),
                setformdata(CreateProductsinitialData);
            }}
            className="cursor-pointer"
            variant="ghost"
          >
            Create Product
          </Button>
        </TabsList>

        {/* Create Product Sheet */}
        <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editProductId !== null ? "Update Product" : "Create Products"}
              </SheetTitle>
              <form
                onSubmit={editProductId !== null ? updateProduct : handleSubmit}
                className="flex flex-col gap-4 mt-2"
              >
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Enter product name"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formdata.price}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Enter price"
                  required
                />
                <input
                  type="number"
                  name="stocks"
                  value={formdata.stocks}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Enter stock count"
                  required
                />
                <Button type="submit">
                  {editProductId ? "Update Product" : "Create Product"}
                </Button>
              </form>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Your Admin Product Page</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your products.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stocks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((item) => (
                    <TableRow key={item._id as string}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}$</TableCell>
                      <TableCell>{item.stocks}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button
                          onClick={() => {
                            setformdata(item);
                            setEditProductId(item._id || null);
                            setIsCreateOpen(true);
                          }}
                          className="bg-green-500 text-white"
                        >
                          Edit
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button variant="destructive">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the product.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleDelete(item._id as string)
                                  }
                                >
                                  Delete
                                </Button>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateProduct;
