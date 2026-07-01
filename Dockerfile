FROM nginx:alpine

ARG GIT_COMMIT=unknown

COPY dist/skulba-admin/browser /usr/share/nginx/html

RUN echo "{\"version\":\"${GIT_COMMIT}\"}" > /usr/share/nginx/html/version.json

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
