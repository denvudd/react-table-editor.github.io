"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/redux/store";
import { fetchTable } from "@/lib/redux/table/asyncActions";
import { setCurrentPage } from "@/lib/redux/filters/slice";
import { tableSelector } from "@/lib/redux/table/selectors";
import { filterSelector } from "@/lib/redux/filters/selectors";
import { authSelector } from "@/lib/redux/auth/selectors";

import qs from "query-string";
import { ZodError } from "zod";
import { toast } from "sonner";

import { updateRow } from "@/actions/update-row";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertError } from "@/components/ui/AlertError";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle, PlusCircle } from "lucide-react";
import Pagination from "@/components/pagers/Pagination";
import CreateRowForm from "@/components/forms/CreateRowForm";
import DeleteRowButton from "@/components/DeleteRowButton";

import { ResponseStatus } from "@/types";
import { TableDataKeys } from "@/types/table";
import { TableValidator } from "@/lib/validators/table";
import { getRandomJoke } from "@/actions/get-random-joke";

const TablePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(authSelector);
  const { results, count, status } = useSelector(tableSelector);
  const { offset, limit } = useSelector(filterSelector);

  const router = useRouter();
  const params = useSearchParams().toString();
  const currentParams = qs.parse(params, {
    parseBooleans: true,
    parseNumbers: true,
  });

  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [randomJoke, setRandomJoke] = React.useState<string>("");

  const getDataTable = async () => {
    dispatch(
      fetchTable({
        limit,
        offset,
      })
    );
  };

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");

      return;
    }

    if (!!Object.keys(currentParams).length) {
      dispatch(setCurrentPage(currentParams.offset as number));
    }

    getRandomJoke().then((joke) => setRandomJoke(joke));
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");

      return;
    }

    const query = qs.stringifyUrl({
      url: window.location.href,
      query: {
        offset,
      },
    });

    router.push(query);

    getDataTable();

    window.scrollTo(0, 0);
  }, [limit, offset]);

  const changePage = React.useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page * limit));
    },
    [limit]
  );

  const onBlurRow =
    (fieldName: TableDataKeys) => (e: React.FocusEvent<HTMLInputElement>) => {
      const defaultValue = e.target.defaultValue;
      const value = e.target.value;
      const { shape } = TableValidator;

      if (fieldName !== "id" && value !== defaultValue) {
        try {
          const parsedValue = shape[fieldName].parse(value);

          if (!!parsedValue) {
            updateRow(e.target.id, fieldName, parsedValue);

            toast.success(`Row with ID ${e.target.id} updated successfully`);
          }

          router.refresh();
        } catch (error: unknown) {
          if (error instanceof ZodError) {
            toast.error(JSON.parse(error.message)[0].message);
          }

          if (typeof error === "string") {
            toast.error(error);
          }

          router.refresh();
        }
      }
    };

  const openCreating = React.useCallback(() => {
    setIsCreating(true);
  }, []);

  const closeCreating = React.useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <div className="mt-16">
      {status === ResponseStatus.LOADING && (
        <div className="flex flex-col gap-4">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="w-full h-20 p-4" />
            ))}
        </div>
      )}

      {status === ResponseStatus.SUCCESS && !!results?.length && (
        <>
          {isCreating ? (
            <CreateRowForm closeForm={closeCreating} />
          ) : (
            <div className="border-b py-4 mb-2">
              <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={openCreating}
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Add new row{" "}
              </Button>
            </div>
          )}
          <Table>
            <TableCaption>Total Count: {count}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Birhday Date</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id} className="relative group">
                  {(Object.keys(item) as TableDataKeys[]).map((key) =>
                    key === "id" ? (
                      <TableCell key={key}>{item[key]}</TableCell>
                    ) : (
                      <TableCell key={key}>
                        <div className="relative group">
                          <Input
                            id={String(item.id)}
                            defaultValue={item[key]}
                            className="placeholder:text-primary peer"
                            onBlur={onBlurRow(key)}
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-0 right-0 h-10 hidden peer-focus-within:flex"
                            title="Approve changes"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  )}

                  <DeleteRowButton rowId={item.id} />
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            changePage={changePage}
            limit={10}
            totalCount={count}
            page={offset / limit}
          />
        </>
      )}
      {status === ResponseStatus.FAILURE && <AlertError />}
      {randomJoke && (
        <div className="mt-16 bg-muted border rounded-md p-4 flex flex-col gap-4">
          <h4 className="text-xl font-semibold text-center">
            Oh no, random jokes!
          </h4>
          <div className="flex justify-center">
            <Image
              src="https://i.ytimg.com/vi/35DqyyPy94A/maxresdefault.jpg"
              width={320}
              height={320}
              alt="Random joke meme"
              className="rounded-sm"
            />
          </div>
          <p className="text-gray-500 text-center">&quot;{randomJoke}&quot;</p>
        </div>
      )}
    </div>
  );
};

export default TablePage;
